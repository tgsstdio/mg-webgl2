/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgPipelineMultisampleStateCreateInfo	{
    flags : number;
    rasterizationSamples : MgSampleCountFlagBits;
    sampleShadingEnable : boolean;
    minSampleShading : number;
    sampleMask : Array<number>|null;
    alphaToCoverageEnable : boolean;
    alphaToOneEnable : boolean;
	}
}
