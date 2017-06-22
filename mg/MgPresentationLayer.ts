import { IMgPresentationLayer } from './IMgPresentationLayer'
import { IMgGraphicsConfiguration } from './IMgGraphicsConfiguration'
import { IMgPresentationBarrierEntrypoint }
  from './IMgPresentationBarrierEntrypoint'
import { IMgSwapchainCollection } from './IMgSwapchainCollection'  
import { IMgSemaphore } from './IMgSemaphore'
import { MgResult } from './MgResult'
import { IMgCommandBuffer } from './IMgCommandBuffer'
import { MgSwapchainBuffer } from './MgSwapchainBuffer'
import { MgSubmitInfo } from './MgSubmitInfo'
import { MgPresentInfoKHRImage } from './MgPresentInfoKHRImage'
import { MgPresentInfoKHR } from './MgPresentInfoKHR'

export class MgPresentationLayer implements IMgPresentationLayer {
  private readonly mGraphicsConfiguration: IMgGraphicsConfiguration;
  private readonly mBarrier: IMgPresentationBarrierEntrypoint;
  private readonly mCollection: IMgSwapchainCollection;

  constructor	(
    graphicsConfiguration: IMgGraphicsConfiguration
    , collection: IMgSwapchainCollection
    , barrier: IMgPresentationBarrierEntrypoint
  ) {
    this.mGraphicsConfiguration = graphicsConfiguration;
    this.mCollection = collection;
    this.mBarrier = barrier;
  }

  private acquireNextImage (
    presentComplete: IMgSemaphore
    , timeout:number
  ): number {
    let out
      : { pImageIndex:number}
      = { pImageIndex:0};
    let err = this.mGraphicsConfiguration.device.acquireNextImageKHR(
      this.mCollection.swapchain
      , timeout
      , presentComplete
      , null
      , out);
    if (err != MgResult.SUCCESS) {
      throw new Error(err.toString());
    }  
    return out.pImageIndex;
  }

  beginDraw (
    postPresent: IMgCommandBuffer
    , presentComplete: IMgSemaphore
    , timeout:number
  ) : number {
    // Get next image in the swap chain (back/front buffer)
    //err = swapChain.acquireNextImage(semaphores.presentComplete, &currentBuffer);
    let nextImage = this.acquireNextImage (presentComplete, timeout);
    let currentBuffer : MgSwapchainBuffer = this.mCollection.buffers [nextImage];

    this.mBarrier.submitPostPresentBarrier (postPresent, currentBuffer.image);
    let submitInfo = new MgSubmitInfo();
    submitInfo.commandBuffers = [postPresent];

    let result = this.mGraphicsConfiguration.queue.queueSubmit(
      [submitInfo]
      , null);
    if (result != MgResult.SUCCESS) {
      throw new Error(result.toString());
    } 

    return nextImage;
  }

  endDraw (
    nextImage: Array<number>
    , prePresent: IMgCommandBuffer
    , renderComplete: Array<IMgSemaphore>): void
  {
    let presentImages = new Array<MgPresentInfoKHRImage>();
    for (let image of nextImage) {
      let currentBuffer : MgSwapchainBuffer = this.mCollection.buffers[image];
      this.mBarrier.submitPrePresentBarrier(
        prePresent
        , currentBuffer.image);

      let submitInfo = new MgSubmitInfo();
      submitInfo.commandBuffers = [prePresent];

      let result = this.mGraphicsConfiguration.queue.queueSubmit(
        [submitInfo]
        , null);
      if (result != MgResult.SUCCESS) {
        throw new Error(result.toString());
      }

      let presentImage = new MgPresentInfoKHRImage();
      presentImage.imageIndex = image;
      presentImage.swapchain = this.mCollection.swapchain,

      presentImages.push(presentImage);
    }

    let presentInfo = new MgPresentInfoKHR();
    presentInfo.waitSemaphores = renderComplete;
    presentInfo.images = presentImages;

    //err = swapChain.queuePresent(queue, currentBuffer, semaphores.renderComplete);
    let err = this.mGraphicsConfiguration.queue.queuePresentKHR (presentInfo);
    if (err != MgResult.SUCCESS) {
      throw new Error(err.toString());
    }  

    err = this.mGraphicsConfiguration.queue.queueWaitIdle();
    if (err != MgResult.SUCCESS) {
      throw new Error(err.toString());
    }  
  }        
}
