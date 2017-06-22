/// <reference path="Magnesium.ts" />

namespace Magnesium {
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
}