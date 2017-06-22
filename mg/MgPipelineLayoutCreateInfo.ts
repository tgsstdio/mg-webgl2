/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgPipelineLayoutCreateInfo	{
    flags : number;
    setLayouts : Array<IMgDescriptorSetLayout>;
    pushConstantRanges : Array<MgPushConstantRange>;
	}
}