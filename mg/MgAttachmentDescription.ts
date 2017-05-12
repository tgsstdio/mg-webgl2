/// <reference path="MgAttachmentDescriptionFlagBits.ts" />
/// <reference path="MgFormat.ts" />
/// <reference path="MgSampleCountFlagBits.ts" />
/// <reference path="MgAttachmentLoadOp.ts" />
/// <reference path="MgAttachmentStoreOp.ts" />
/// <reference path="MgAttachmentLoadOp.ts" />
/// <reference path="MgAttachmentStoreOp.ts" />
/// <reference path="MgImageLayout.ts" />
/// <reference path="MgImageLayout.ts" />

namespace Magnesium {
  export class MgAttachmentDescription {
    flags: MgAttachmentDescriptionFlagBits;
    format: MgFormat;
    samples: MgSampleCountFlagBits;
    loadOp: MgAttachmentLoadOp;
    storeOp: MgAttachmentStoreOp;
    stencilLoadOp: MgAttachmentLoadOp;
    stencilStoreOp: MgAttachmentStoreOp;
    initialLayout: MgImageLayout;
    finalLayout: MgImageLayout;
  }
}