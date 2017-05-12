/// <reference path="MgSampleCountFlagBits.ts" />

namespace Magnesium {
  export class MgPipelineMultisampleStateCreateInfo	{
    flags : number;
    rasterizationSamples : MgSampleCountFlagBits;
    sampleShadingEnable : boolean;
    minSampleShading : number;
    sampleMask : Array<number>;
    alphaToCoverageEnable : boolean;
    alphaToOneEnable : boolean;
	}
}
