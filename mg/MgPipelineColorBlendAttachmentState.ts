/// <reference path="MgBlendOp.ts" />
/// <reference path="MgColorComponentFlagBits.ts" />
/// <reference path="MgBlendFactor.ts" />

namespace Magnesium {
  export class MgPipelineColorBlendAttachmentState {
    blendEnable: boolean;
    srcColorBlendFactor: MgBlendFactor;
    dstColorBlendFactor: MgBlendFactor;
    colorBlendOp: MgBlendOp;
    srcAlphaBlendFactor: MgBlendFactor;
    dstAlphaBlendFactor: MgBlendFactor;
    alphaBlendOp: MgBlendOp;
    colorWriteMask: MgColorComponentFlagBits;
  }
}