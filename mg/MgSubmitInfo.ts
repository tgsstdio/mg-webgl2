/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgSubmitInfo {
    waitSemaphores: Array<MgSubmitInfoWaitSemaphoreInfo>;
    commandBuffers: Array<IMgCommandBuffer>;
    signalSemaphores: Array<IMgSemaphore>;
  }
}