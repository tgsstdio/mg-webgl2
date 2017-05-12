/// <reference path="MgCommandBufferUsageFlagBits.ts" />
/// <reference path="MgCommandBufferInheritanceInfo.ts" />

namespace Magnesium {
  export class MgCommandBufferBeginInfo {
    flags: MgCommandBufferUsageFlagBits;
    inheritanceInfo: MgCommandBufferInheritanceInfo;
  }
}