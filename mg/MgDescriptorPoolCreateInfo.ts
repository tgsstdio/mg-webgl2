/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgDescriptorPoolCreateInfo {
    flags : MgDescriptorPoolCreateFlagBits;
    maxSets : number;
    poolSizes : Array<MgDescriptorPoolSize>;
	}
}