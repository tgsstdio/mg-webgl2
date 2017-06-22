/// <reference path="Magnesium.ts" />

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