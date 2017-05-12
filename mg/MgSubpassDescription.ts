/// <reference path="MgAttachmentReference.ts" />
/// <reference path="MgPipelineBindPoint.ts" />

namespace Magnesium {
  export class MgSubpassDescription {
    flags: number;
    pipelineBindPoint: MgPipelineBindPoint;
    inputAttachments: Array<MgAttachmentReference>;
    colorAttachmentCount: number;
    colorAttachments: Array<MgAttachmentReference>;
    resolveAttachments: Array<MgAttachmentReference>;
    depthStencilAttachment: MgAttachmentReference;
    preserveAttachments: Array<number>;
  }
}