import {MgShaderStageFlagBits} from './MgShaderStageFlagBits'

export class MgPushConstantRange {
  stageFlags : MgShaderStageFlagBits;
  offset : number;
  size : number;
}
