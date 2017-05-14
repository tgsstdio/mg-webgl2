/// <reference path="IMgCommandBuffer.ts" />
/// <reference path="MgSubmitInfoWaitSemaphoreInfo.ts" />
/// <reference path="IMgSemaphore.ts" />

namespace Magnesium {
  export class MgSubmitInfo {
    waitSemaphores: Array<MgSubmitInfoWaitSemaphoreInfo>;
    commandBuffers: Array<IMgCommandBuffer>;
    signalSemaphores: Array<IMgSemaphore>;
  }
}