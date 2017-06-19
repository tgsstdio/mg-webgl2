/// <reference path="MgDescriptorType.ts" />
/// <reference path="MgShaderStageFlagBits.ts" />
/// <reference path="IMgSampler.ts" />

namespace Magnesium {
  export class MgDescriptorSetLayoutBinding	{
    binding : number;
    descriptorType : MgDescriptorType;
    descriptorCount : number;
    stageFlags : MgShaderStageFlagBits;
    immutableSamplers : Array<IMgSampler>|null;
	}
}