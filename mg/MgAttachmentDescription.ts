/// <reference path="Magnesium.ts" />

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