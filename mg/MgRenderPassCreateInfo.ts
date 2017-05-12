/// <reference path="MgAttachmentDescription.ts" />
/// <reference path="MgSubpassDescription.ts" />
/// <reference path="MgSubpassDependency.ts" />

namespace Magnesium {
  export class MgRenderPassCreateInfo {
    flags: number;
    attachments: Array<MgAttachmentDescription>;
    subpasses: Array<MgSubpassDescription>;
    dependencies: Array<MgSubpassDependency>;
  }
}