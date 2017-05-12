/// <reference path="MgLogicOp.ts" />
/// <reference path="MgPipelineColorBlendAttachmentState.ts" />
/// <reference path="MgColor4f.ts" />

namespace Magnesium {
  export class MgPipelineColorBlendStateCreateInfo {
    flags : number;
    logicOpEnable : boolean;
    logicOp : MgLogicOp;
    attachments : Array<MgPipelineColorBlendAttachmentState>;
    blendConstants : MgColor4f;
	}
}