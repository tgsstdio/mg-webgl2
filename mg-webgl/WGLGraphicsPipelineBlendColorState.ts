/// <reference path="../mg/MgLogicOp.ts" />
/// <reference path="WGLGraphicsPipelineBlendColorAttachmentState.ts" />

namespace Magnesium {
  export class WGLGraphicsPipelineBlendColorState {
    logicOpEnable: boolean;
    logicOp: MgLogicOp;
    attachments: Array<WGLGraphicsPipelineBlendColorAttachmentState>;
  }
}