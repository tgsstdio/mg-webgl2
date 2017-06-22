/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgDescriptorSetAllocateInfo {
    descriptorSetCount : number;
    descriptorPool : IMgDescriptorPool;
    setLayouts : Array<IMgDescriptorSetLayout>;
	}
}