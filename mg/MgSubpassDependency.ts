/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgSubpassDependency {
    srcSubpass: number;
    dstSubpass: number;
    srcStageMask: MgPipelineStageFlagBits;
    dstStageMask: MgPipelineStageFlagBits;
    srcAccessMask: MgAccessFlagBits;
    dstAccessMask: MgAccessFlagBits;
    dependencyFlags: MgDependencyFlagBits;
  }
}