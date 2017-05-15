/// <reference path="MgLogicOp.ts" />
/// <reference path="GLGraphicsPipelineBlendColorAttachmentState.ts" />

namespace Magnesium {
  export class GLGraphicsPipelineBlendColorState {
    logicOpEnable: boolean;
    logicOp: MgLogicOp;
    attachments: Array<GLGraphicsPipelineBlendColorAttachmentState>;
  }
}