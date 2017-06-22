/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgPipelineColorBlendStateCreateInfo {
    flags : number;
    logicOpEnable : boolean;
    logicOp : MgLogicOp;
    attachments : Array<MgPipelineColorBlendAttachmentState>;
    blendConstants : MgColor4f;
	}
}