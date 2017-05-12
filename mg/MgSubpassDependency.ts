/// <reference path="MgDependencyFlagBits.ts" />
/// <reference path="MgPipelineStageFlagBits.ts" />
/// <reference path="MgAccessFlagBits.ts" />

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