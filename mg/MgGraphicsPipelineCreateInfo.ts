/// <reference path="MgPipelineCreateFlagBits.ts" />
/// <reference path="MgPipelineShaderStageCreateInfo.ts" />
/// <reference path="MgPipelineVertexInputStateCreateInfo.ts" />
/// <reference path="MgPipelineInputAssemblyStateCreateInfo.ts" />
/// <reference path="MgPipelineTessellationStateCreateInfo.ts" />
/// <reference path="MgPipelineViewportStateCreateInfo.ts" />
/// <reference path="MgPipelineRasterizationStateCreateInfo.ts" />
/// <reference path="MgPipelineMultisampleStateCreateInfo.ts" />
/// <reference path="MgPipelineDepthStencilStateCreateInfo.ts" />
/// <reference path="MgPipelineColorBlendStateCreateInfo.ts" />
/// <reference path="MgPipelineDynamicStateCreateInfo.ts" />
/// <reference path="IMgPipelineLayout.ts" />
/// <reference path="IMgRenderPass.ts" />
/// <reference path="IMgPipeline.ts" />

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