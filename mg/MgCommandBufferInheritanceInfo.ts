import {IMgRenderPass}
	from './IMgRenderPass';	  
import {IMgFramebuffer}
	from './IMgFramebuffer';
import {MgQueryControlFlagBits}
	from './MgQueryControlFlagBits';	
import {MgQueryPipelineStatisticFlagBits}
	from './MgQueryPipelineStatisticFlagBits';	  

export class MgCommandBufferInheritanceInfo {
  renderPass: IMgRenderPass;
  subpass: number;
  framebuffer: IMgFramebuffer;
  occlusionQueryEnable: boolean;
  queryFlags: MgQueryControlFlagBits;
  pipelineStatistics: MgQueryPipelineStatisticFlagBits;
}
