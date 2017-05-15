namespace Magnesium {
  export class GLQueueSubmission {
    key : number;
    waits: Array<IGLSemaphore>;
    signals: Array<IGLSemaphore>;
    commandBuffers: Array<IGLCommandBuffer>;
    orderFence: IGLSemaphore;
    
    constructor(key: number, submit: MgSubmitInfo) {
      this.key = key;
    }
  }
}