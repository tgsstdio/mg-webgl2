/// <reference path="MgDescriptorPoolCreateFlagBits.ts" />
/// <reference path="MgDescriptorPoolSize.ts" />

namespace Magnesium {
  export class MgDescriptorPoolCreateInfo {
    flags : MgDescriptorPoolCreateFlagBits;
    maxSets : number;
    poolSizes : Array<MgDescriptorPoolSize>;
	}
}