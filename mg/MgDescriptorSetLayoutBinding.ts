/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgDescriptorSetLayoutBinding	{
    binding : number;
    descriptorType : MgDescriptorType;
    descriptorCount : number;
    stageFlags : MgShaderStageFlagBits;
    immutableSamplers : Array<IMgSampler>|null;
	}
}