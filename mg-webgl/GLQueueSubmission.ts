namespace Magnesium {
  export class GLQueueSubmission {
    key : number;
    waits: Array<IWGLSemaphore>;
    signals: Array<IWGLSemaphore>;
    commandBuffers: Array<IWGLCommandBuffer>;
    orderFence: IWGLSemaphore;
    
    constructor(key: number, submit: MgSubmitInfo) {
      this.key = key;
    }
  }
}