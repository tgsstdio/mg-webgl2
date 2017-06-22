/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgComputePipelineCreateInfo {
    flags : MgPipelineCreateFlagBits;
    stage : MgPipelineShaderStageCreateInfo;
    layout : IMgPipelineLayout;
    threadsPerWorkgroup : MgVec3Ui;
    basePipelineHandle : IMgPipeline;
    basePipelineIndex : number;
	}
}