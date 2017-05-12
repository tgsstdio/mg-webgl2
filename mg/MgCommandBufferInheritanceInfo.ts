/// <reference path="IMgRenderPass.ts" />
/// <reference path="MgQueryControlFlagBits.ts" />
/// <reference path="IMgFramebuffer.ts" />
/// <reference path="MgQueryPipelineStatisticFlagBits.ts" />

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