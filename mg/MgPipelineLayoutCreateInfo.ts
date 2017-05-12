/// <reference path="IMgDescriptorSetLayout.ts" />
/// <reference path="MgPushConstantRange.ts" />

namespace Magnesium {
  export class MgPipelineLayoutCreateInfo	{
    flags : number;
    setLayouts : Array<IMgDescriptorSetLayout>;
    pushConstantRanges : Array<MgPushConstantRange>;
	}
}