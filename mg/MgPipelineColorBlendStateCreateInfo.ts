import {MgLogicOp} from './MgLogicOp'
import {MgPipelineColorBlendAttachmentState} 
  from './MgPipelineColorBlendAttachmentState'
import {MgColor4f} from './MgColor4f'

export class MgPipelineColorBlendStateCreateInfo {
  flags : number;
  logicOpEnable : boolean;
  logicOp : MgLogicOp;
  attachments : Array<MgPipelineColorBlendAttachmentState>;
  blendConstants : MgColor4f;
}
