/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgSubmitInfoWaitSemaphoreInfo {
    waitSemaphore: IMgSemaphore;
    waitDstStageMask: MgPipelineStageFlagBits;
  }
}