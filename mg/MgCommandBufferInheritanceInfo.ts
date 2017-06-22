/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgCommandBufferInheritanceInfo {
    renderPass: IMgRenderPass;
    subpass: number;
    framebuffer: IMgFramebuffer;
    occlusionQueryEnable: boolean;
    queryFlags: MgQueryControlFlagBits;
    pipelineStatistics: MgQueryPipelineStatisticFlagBits;
  }
}