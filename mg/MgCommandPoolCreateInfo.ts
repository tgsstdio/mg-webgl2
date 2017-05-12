/// <reference path="MgDependencyFlagBits.ts" />
/// <reference path="MgPipelineStageFlagBits.ts" />
/// <reference path="MgAccessFlagBits.ts" />

namespace Magnesium {
  export class MgCommandPoolCreateInfo {
    flags: MgCommandPoolCreateFlagBits;
    queueFamilyIndex: number;
  }
}