/// <reference path="IMgFramebuffer.ts" />
/// <reference path="IMgRenderPass.ts" />
/// <reference path="MgRect2D.ts" />
/// <reference path="MgClearValue.ts" />

namespace Magnesium {
  export class MgRenderPassBeginInfo {
    renderPass: IMgRenderPass;
    framebuffer: IMgFramebuffer;
    renderArea: MgRect2D;
    clearValues: Array<MgClearValue>;
  }
}