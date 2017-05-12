/// <reference path="IMgRenderPass.ts" />
/// <reference path="IMgImageView.ts" />

namespace Magnesium {
  export class MgFramebufferCreateInfo {
    flags: number;
    renderPass: IMgRenderPass;
    attachments: Array<IMgImageView>;
    width: number;
    height: number;
    layers: number;
  }
}