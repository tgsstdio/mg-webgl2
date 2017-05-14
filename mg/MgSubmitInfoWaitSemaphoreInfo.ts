/// <reference path="IMgSemaphore.ts" />
/// <reference path="MgPipelineStageFlagBits.ts" />

namespace Magnesium {
  export class MgSubmitInfoWaitSemaphoreInfo {
    waitSemaphore: IMgSemaphore;
    waitDstStageMask: MgPipelineStageFlagBits;
  }
}