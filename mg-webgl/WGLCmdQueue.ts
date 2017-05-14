/// <reference path="./IWGLQueue.ts" />
/// <reference path="./GLCmdEncoderCategory.ts" />
/// <reference path="./GLCmdEncoderContext.ts" />
/// <reference path="../mg/MgSubmitInfoWaitSemaphoreInfo.ts" />

namespace Magnesium {




  
  class GLCmdCommandBufferRecord {
    contexts: Array<GLCmdEncoderContext>;
    instructions: Array<GLCmdRecordInstruction>;
    graphicsGrid: GLCmdGraphicsGrid;
    computeGrid: GLCmdComputeGrid;
    blitGrid: GLCmdBlitGrid;
  }
  
  export interface IGLCommandBuffer {
    isQueueReady: boolean;
    resetAllData(): void;
    record: GLCmdCommandBufferRecord;
  }

  class GLQueueSubmission {
    key : number;
    waits: Array<IGLSemaphore>;
    signals: Array<IGLSemaphore>;
    commandBuffers: Array<IGLCommandBuffer>;
    orderFence: IGLSemaphore;
    
    constructor(key: number, submit: MgSubmitInfo) {
      this.key = key;
    }
  }

  export interface IGLFence extends IMgFence {
    reset() : void;
    beginSync() : void;
  }

  export interface IGLQueueFence extends IMgFence {
    signal() : boolean;
  }

  export interface IGLSemaphore extends IMgSemaphore {
    isReady () : boolean;
    reset () : void;
    beginSync() : void;    
  }

  export interface IGLSemaphoreEntrypoint {
    createSemaphore() : IGLSemaphore;
  }

  class GLQueueSubmitOrder {
    key : number;
    fence : IGLFence;
    submissions: Map<number, IGLSemaphore>;

    constructor(key: number) {
      this.key = key;
      this.submissions = new Map<number, IGLSemaphore>();
    }
  }   

  export interface IGLCmdStateRenderer {

  }

  export interface IGLSwapchainKHR extends IMgSwapchainKHR {
		getNextImage () : number;
		swapBuffers() : void;
  }

  class GLCmdComputeGrid {

  }

  class GLCmdComputeRecording {
    grid: GLCmdComputeGrid
    encoder: IGLCmdComputeEncoder;
    constructor(
      grid: GLCmdComputeGrid
      , encoder: IGLCmdComputeEncoder
    ) {
      this.grid = grid;
      this.encoder = encoder;
    }
  }

  class GLCmdGraphicsGrid {

  }

  class GLCmdGraphicsRecording {
    renderer: IGLCmdStateRenderer;
    grid: GLCmdGraphicsGrid;

    constructor(grid: GLCmdGraphicsGrid
    , renderer: IGLCmdStateRenderer)
    {
      this.grid = grid;
      this.renderer = renderer;
    }
  }

  class GLCmdBlitGrid {

  }

  interface IGLBlitOperationEntrypoint {

  }

  class GLCmdBlitRecording {
    grid: GLCmdBlitGrid;
    entrypoint: IGLBlitOperationEntrypoint;

    constructor(
      grid: GLCmdBlitGrid
      , entrypoint: IGLBlitOperationEntrypoint
    ) {
      this.grid = grid;
      this.entrypoint = entrypoint;
    }
  }




  export class WGLCmdQueue implements IWGLQueue {
    private mSubmissions : Map<number, GLQueueSubmission>;
    private mOrders : Map<number, GLQueueSubmitOrder>;
    private mSubmissionKey: number;
    private mOrderKey: number;

    private mSemaphores : IGLSemaphoreEntrypoint;
    private mRenderer: IGLCmdStateRenderer;
    private mBlit : IGLBlitOperationEntrypoint;

    constructor(semaphores: IGLSemaphoreEntrypoint
      , renderer: IGLCmdStateRenderer
      , blit: IGLBlitOperationEntrypoint
    ) {
      this.mSemaphores = semaphores;
      this.mRenderer = renderer;
      this.mBlit = blit;

      this.mSubmissions = new Map<number, GLQueueSubmission>();
      this.mOrders = new Map<number, GLQueueSubmitOrder>();
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

			var signalInfos = new Array<MgSubmitInfoWaitSemaphoreInfo>(0);
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
				let sc = image.swapchain as IGLSwapchainKHR;
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
      buffer: IGLCommandBuffer
      , renderer: IGLCmdStateRenderer
    ) : GLCmdCommandRecording {
        return new GLCmdCommandRecording(
          new GLCmdComputeRecording(buffer.record.computeGrid, new GLCmdComputeEncoder())
          , new GLCmdGraphicsRecording(buffer.record.graphicsGrid, renderer)
          , new GLCmdBlitRecording(buffer.record.blitGrid, this.mBlit));
    }

    render(buffer : IGLCommandBuffer) : void {
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
			  let request : GLQueueSubmission = this.mSubmissions.get(key);
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
            let order: GLQueueSubmitOrder = this.mOrders.get(orderKey);

            // Copy keys across to temp array
						let submissionKeys = new Array<number>(order.submissions.size);            
            for (let key of order.submissions.keys()) {
              submissionKeys.push(key);
            }

						for (let key of submissionKeys) {
              if (order.submissions.has(key)) {
                let signal : IGLSemaphore = order.submissions.get(key);

                if (signal.isReady()) {
									signal.reset ();
									order.submissions.delete (key);
                }
              }
						}

						if (order.submissions.size <= 0) {
							let fence : IGLFence = order.fence;
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
			var internalFence = fence as IGLQueueFence;
			if (internalFence) {
				var result = this.queueWaitIdle ();
				internalFence.signal ();
				return result;
			}
			else {
				return MgResult.SUCCESS;
			}
		}

		enqueueSubmission (sub: MgSubmitInfo) : GLQueueSubmission {
			var submit = new GLQueueSubmission (this.mSubmissionKey, sub);
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
          var submit = this.enqueueSubmission (sub);
          if (fence != null) {
            submit.orderFence = this.mSemaphores.createSemaphore ();
          }
          children.push (submit);
        }

        if (fence != null) {

          var order = new GLQueueSubmitOrder (this.mOrderKey);
          order.fence = fence as IGLFence;
          for (let sub of children)
          {
            order.submissions.set (sub.key, sub.orderFence);
          }
          // JUST LOOP AROUND
          const MAX_VALUE = 1024;
          this.mOrderKey = (this.mOrderKey >= MAX_VALUE) ? 0 : this.mOrderKey + 1;
          this.mOrders.set (order.key, order);
        }

        return MgResult.SUCCESS;
      }
    }		  
  }
}