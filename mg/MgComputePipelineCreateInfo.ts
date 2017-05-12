/// <reference path="MgPipelineCreateFlagBits.ts" />
/// <reference path="MgPipelineShaderStageCreateInfo.ts" />
/// <reference path="IMgPipelineLayout.ts" />
/// <reference path="MgVec3Ui.ts" />
/// <reference path="IMgPipeline.ts" />

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