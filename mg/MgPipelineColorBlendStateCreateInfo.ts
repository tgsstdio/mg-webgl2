import {MgLogicOp} from './MgLogicOp'
import {MgPipelineColorBlendAttachmentState} 
  from './MgPipelineColorBlendAttachmentState'
import {MgColor4f} from './MgColor4f'

export class MgPipelineColorBlendStateCreateInfo {
  constructor() {
    this.flags = 0;
    this.logicOp = MgLogicOp.CLEAR;
    this.logicOpEnable = false;
    this.blendConstants = new MgColor4f(0.0, 0.0, 0.0, 0.0);
    this.attachments = null;
  }

  flags : number;
  logicOpEnable : boolean;
  logicOp : MgLogicOp;
  attachments : Array<MgPipelineColorBlendAttachmentState>|null;
  blendConstants : MgColor4f;
}
