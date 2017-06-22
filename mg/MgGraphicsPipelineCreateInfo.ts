import {MgPipelineCreateFlagBits} 
  from './MgPipelineCreateFlagBits'
import {MgPipelineVertexInputStateCreateInfo} 
  from './MgPipelineVertexInputStateCreateInfo'
import {MgPipelineShaderStageCreateInfo}
  from './MgPipelineShaderStageCreateInfo' 
import {MgPipelineInputAssemblyStateCreateInfo}
  from './MgPipelineInputAssemblyStateCreateInfo'
import {MgPipelineTessellationStateCreateInfo}
  from './MgPipelineTessellationStateCreateInfo'
import {MgPipelineViewportStateCreateInfo}
  from './MgPipelineViewportStateCreateInfo'
import {MgPipelineRasterizationStateCreateInfo}
  from './MgPipelineRasterizationStateCreateInfo'
import {MgPipelineMultisampleStateCreateInfo}
  from './MgPipelineMultisampleStateCreateInfo'
import {MgPipelineDepthStencilStateCreateInfo}
  from './MgPipelineDepthStencilStateCreateInfo'
import {MgPipelineColorBlendStateCreateInfo}
  from './MgPipelineColorBlendStateCreateInfo'
import {MgPipelineDynamicStateCreateInfo}
  from './MgPipelineDynamicStateCreateInfo'
import {IMgPipelineLayout} from './IMgPipelineLayout'
import {IMgRenderPass} from './IMgRenderPass'
import {IMgPipeline} from './IMgPipeline'

export class MgGraphicsPipelineCreateInfo	{
  flags : MgPipelineCreateFlagBits;
  stages : Array<MgPipelineShaderStageCreateInfo>;
  vertexInputState : MgPipelineVertexInputStateCreateInfo;
  inputAssemblyState : MgPipelineInputAssemblyStateCreateInfo;
  tessellationState : MgPipelineTessellationStateCreateInfo;
  viewportState : MgPipelineViewportStateCreateInfo|null;
  rasterizationState : MgPipelineRasterizationStateCreateInfo;
  multisampleState : MgPipelineMultisampleStateCreateInfo;
  depthStencilState : MgPipelineDepthStencilStateCreateInfo;
  colorBlendState : MgPipelineColorBlendStateCreateInfo;
  dynamicState : MgPipelineDynamicStateCreateInfo;
  layout : IMgPipelineLayout;
  renderPass : IMgRenderPass;
  subpass : number;
  basePipelineHandle : IMgPipeline;
  basePipelineIndex : number;
}
