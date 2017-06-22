/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgRenderPassCreateInfo {
    flags: number;
    attachments: Array<MgAttachmentDescription>;
    subpasses: Array<MgSubpassDescription>;
    dependencies: Array<MgSubpassDependency>;
  }
}