import {MgBlendFactor} from './MgBlendFactor'
import {MgBlendOp} from './MgBlendOp'
import {MgColorComponentFlagBits} from './MgColorComponentFlagBits'

export class MgPipelineColorBlendAttachmentState {
  constructor() {
    this.blendEnable = false;
    this.srcColorBlendFactor = MgBlendFactor.ZERO;
    this.dstColorBlendFactor = MgBlendFactor.ZERO;
    this.colorBlendOp = MgBlendOp.ADD;
    this.srcAlphaBlendFactor = MgBlendFactor.ZERO;
    this.dstAlphaBlendFactor = MgBlendFactor.ZERO;
    this.colorWriteMask = 0;
  }

  blendEnable: boolean;
  srcColorBlendFactor: MgBlendFactor;
  dstColorBlendFactor: MgBlendFactor;
  colorBlendOp: MgBlendOp;
  srcAlphaBlendFactor: MgBlendFactor;
  dstAlphaBlendFactor: MgBlendFactor;
  alphaBlendOp: MgBlendOp;
  colorWriteMask: MgColorComponentFlagBits;
}
