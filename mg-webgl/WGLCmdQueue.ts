/// <reference path="IWGLQueue.ts" />
/// <reference path="WGLCmdEncoderCategory.ts" />
/// <reference path="WGLQueueSubmitOrder.ts" />
/// <reference path="WGLCmdEncoderContext.ts" />
/// <reference path="WGLCmdComputeRecording.ts" />
/// <reference path="../mg/MgSubmitInfoWaitSemaphoreInfo.ts" />
/// <reference path="IWGLCommandBuffer.ts" />
/// <reference path="GLQueueSubmission.ts" />
/// <reference path="IWGLSemaphoreEntrypoint.ts" />
/// <reference path="IWGLCmdStateRenderer.ts" />
/// <reference path="IWGLBlitOperationEntrypoint.ts" />
/// <reference path="IWGLSwapchainKHR.ts" />
/// <reference path="WGLCmdCommandRecording.ts" />
/// <reference path="IWGLFence.ts" />
/// <reference path="IGLQueueFence.ts" />

namespace Magnesium {
  export class WGLCmdQueue implements IWGLQueue {
    private mSubmissions : Map<number, GLQueueSubmission>;
    private mOrders : Map<number, WGLQueueSubmitOrder>;
    private mSubmissionKey: number;
    private mOrderKey: number;

    private mSemaphores : IWGLSemaphoreEntrypoint;
    private mRenderer: IWGLCmdStateRenderer;
    private mBlit : IWGLBlitOperationEntrypoint;

    constructor(semaphores: IWGLSemaphoreEntrypoint
      , renderer: IWGLCmdStateRenderer
      , blit: IWGLBlitOperationEntrypoint
    ) {
      this.mSemaphores = semaphores;
      this.mRenderer = renderer;
      this.mBlit = blit;

      this.mSubmissions = new Map<number, GLQueueSubmission>();
      this.mOrders = new Map<number, WGLQueueSubmitOrder>();
      this.mSubmissionKey = 0;
      this.mOrderKey = 0;
    }

		queueBindSparse (
      pBindInfo: Array<MgBindSparseInfo>
      , fence: IMgFence
    )  : never	{
			throw new Error ('Not implemented');
		}

		queuePresentKHR (pPresentInfo: MgPresentInfoKHR) : MgResult	{
			// EARLY EXIT
			if (pPresentInfo == null) {
				return MgResult.SUCCESS;
			}

			let signalInfos = new Array<MgSubmitInfoWaitSemaphoreInfo>(0);
			if (pPresentInfo.waitSemaphores != null) {
				for (let signal of pPresentInfo.waitSemaphores) {
					if (signal != null)	{
            let semaphoreInfo : MgSubmitInfoWaitSemaphoreInfo = new MgSubmitInfoWaitSemaphoreInfo();
            semaphoreInfo.waitDstStageMask = 0;
            semaphoreInfo.waitSemaphore = signal;
						signalInfos.push (semaphoreInfo);
					}
				}
			}

			let sub = new MgSubmitInfo();
      sub.waitSemaphores = signalInfos;
			this.enqueueSubmission (sub);

			for (let image of pPresentInfo.images) {
				let sc = image.swapchain as IWGLSwapchainKHR;
				if (sc != null)	{
					sc.swapBuffers ();
				}
			}

			return MgResult.SUCCESS;
		}    

    isEmpty() : boolean {
      return this.mSubmissions.size <= 0 && this.mOrders.size <= 0;
    }

    generateRecording(
      buffer: IWGLCommandBuffer
      , renderer: IWGLCmdStateRenderer
    ) : WGLCmdCommandRecording {
        return new WGLCmdCommandRecording(
          new WGLCmdComputeRecording(buffer.record.computeGrid, new WGLCmdComputeEncoder())
          , new WGLCmdGraphicsRecording(buffer.record.graphicsGrid, renderer)
          , new GLCmdBlitRecording(buffer.record.blitGrid, this.mBlit));
    }

    render(buffer : IWGLCommandBuffer) : void {
      if (buffer.isQueueReady) {
        let recording = this.generateRecording(buffer, this.mRenderer);

        let record = buffer.record;
        for (let context of buffer.record.contexts) {
          for (let i = context.first; i <= context.last; i += 1)
          {
              buffer.record.instructions[i].perform(recording);
          }
        }          
      }
    }

    performRequests(key : number) : void {
      if (this.mSubmissions.has(key))
      {
			  let request : GLQueueSubmission = this.mSubmissions.get(key) as GLQueueSubmission;
        let requirements : number = request.waits.length;
        let checks : number = 0;

        for (let semaphore of request.waits) {
          if (semaphore.isReady ()) {
						checks += 1;
					}
        }

				if (checks >= requirements) {
          if (request.commandBuffers != null)	{
            for (let buffer of request.commandBuffers) {
              this.render(buffer);
						}
          }

          for (let signal of request.signals)	{
						signal.reset ();
						signal.beginSync ();
					}

					if (request.orderFence != null)	{
						request.orderFence.reset ();
						request.orderFence.beginSync ();
					}

          this.mSubmissions.delete (key);
        }
      }
    }

		queueWaitIdle () : MgResult	{
			do
			{
				let requestKeys = new Array<number>(this.mSubmissions.size);
				
        // Copy keys across to temp array
        for (let key of this.mSubmissions.keys()) {
          requestKeys.push(key);
        }

				for(let key of requestKeys) {
					this.performRequests (key);
				}

				let orderKeys = new Array<number>(this.mOrders.size);
        // Copy keys across to temp array
        for (let key of this.mOrders.keys()) {
          orderKeys.push(key);
        }

				for (let orderKey of orderKeys)	{
					
					if (this.mOrders.has(orderKey)) {
            let order: WGLQueueSubmitOrder = this.mOrders.get(orderKey) as WGLQueueSubmitOrder;

            // Copy keys across to temp array
						let submissionKeys = new Array<number>(order.submissions.size);            
            for (let key of order.submissions.keys()) {
              submissionKeys.push(key);
            }

						for (let key of submissionKeys) {
              if (order.submissions.has(key)) {
                let signal : IWGLSemaphore = order.submissions.get(key) as IWGLSemaphore;

                if (signal.isReady()) {
									signal.reset ();
									order.submissions.delete (key);
                }
              }
						}

						if (order.submissions.size <= 0) {
							let fence : IWGLFence = order.fence;
              fence.reset();
              fence.beginSync();
							this.mOrders.delete(orderKey);
						}
					}
				}

			} while (!this.isEmpty());

			return MgResult.SUCCESS;
		}

		completeAllPreviousSubmissions (fence: IMgFence) : MgResult
		{
			let internalFence = fence as IGLQueueFence;
			if (internalFence) {
				let result = this.queueWaitIdle ();
				internalFence.signal ();
				return result;
			}
			else {
				return MgResult.SUCCESS;
			}
		}

		enqueueSubmission (sub: MgSubmitInfo) : GLQueueSubmission {
			let submit = new GLQueueSubmission (this.mSubmissionKey, sub);
			// JUST LOOP AROUND
      const MAX_VALUE = 1024;
			this.mSubmissionKey = (this.mSubmissionKey >= MAX_VALUE) ? 0 : this.mSubmissionKey + 1;
			this.mSubmissions.set (submit.key, submit);
			return submit;
		}

    queueSubmit (pSubmits: Array<MgSubmitInfo>, fence: IMgFence) : MgResult {
      if (pSubmits == null) {				
        return this.completeAllPreviousSubmissions (fence);
      } 
      else {
        let children = new Array<GLQueueSubmission> ();

        for (let sub of pSubmits) {
          let submit = this.enqueueSubmission (sub);
          if (fence != null) {
            submit.orderFence = this.mSemaphores.createSemaphore ();
          }
          children.push (submit);
        }

        if (fence != null) {

          let order = new WGLQueueSubmitOrder (this.mOrderKey);
          order.fence = fence as IWGLFence;
          for (let sub of children)
          {
            order.submissions.set (sub.key, sub.orderFence);
          }
          // JUST LOOP AROUND
          const ORDER_MAX_VALUE = 1024;
          this.mOrderKey = (this.mOrderKey >= ORDER_MAX_VALUE) ? 0 : this.mOrderKey + 1;
          this.mOrders.set (order.key, order);
        }

        return MgResult.SUCCESS;
      }
    }		  
  }
}