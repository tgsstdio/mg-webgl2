/// <reference path="IMgDescriptorPool.ts" />
/// <reference path="IMgDescriptorSetLayout.ts" />

namespace Magnesium {
  export class MgDescriptorSetAllocateInfo {
    descriptorSetCount : number;
    descriptorPool : IMgDescriptorPool;
    setLayouts : Array<IMgDescriptorSetLayout>;
	}
}