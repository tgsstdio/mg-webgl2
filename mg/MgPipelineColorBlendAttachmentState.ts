import {MgBlendFactor} from './MgBlendFactor'
import {MgBlendOp} from './MgBlendOp'
import {MgColorComponentFlagBits} from './MgColorComponentFlagBits'

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
