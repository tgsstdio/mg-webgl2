/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgRenderPassBeginInfo {
    renderPass: IMgRenderPass;
    framebuffer: IMgFramebuffer;
    renderArea: MgRect2D;
    clearValues: Array<MgClearValue>;
  }
}