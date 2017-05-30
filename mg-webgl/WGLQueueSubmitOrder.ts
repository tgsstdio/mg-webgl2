/// <reference path="IWGLSemaphore.ts" />

namespace Magnesium {
  export class WGLQueueSubmitOrder {
    key : number;
    fence : IGLFence;
    submissions: Map<number, IWGLSemaphore>;

    constructor(key: number) {
      this.key = key;
      this.submissions = new Map<number, IWGLSemaphore>();
    }
  }  
}