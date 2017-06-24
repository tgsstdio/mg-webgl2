import {MgPipelineCreateFlagBits}
	from './MgPipelineCreateFlagBits';	  
import {MgPipelineShaderStageCreateInfo}
	from './MgPipelineShaderStageCreateInfo';
import {IMgPipelineLayout}
	from './IMgPipelineLayout';	
import {MgVec3Ui}
	from './MgVec3Ui';
import {IMgPipeline}
	from './IMgPipeline';	  

export class MgComputePipelineCreateInfo {
  flags : MgPipelineCreateFlagBits;
  stage : MgPipelineShaderStageCreateInfo;
  layout : IMgPipelineLayout;
  threadsPerWorkgroup : MgVec3Ui;
  basePipelineHandle : IMgPipeline;
  basePipelineIndex : number;
}
