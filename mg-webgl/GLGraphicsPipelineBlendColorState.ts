/// <reference path="../mg/MgLogicOp.ts" />
/// <reference path="GLGraphicsPipelineBlendColorAttachmentState.ts" />

namespace Magnesium {
  export class GLGraphicsPipelineBlendColorState {
    logicOpEnable: boolean;
    logicOp: MgLogicOp;
    attachments: Array<GLGraphicsPipelineBlendColorAttachmentState>;
  }
}