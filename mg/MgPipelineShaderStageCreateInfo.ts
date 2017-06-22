import {IMgShaderModule} from './IMgShaderModule'
import {MgShaderStageFlagBits} from './MgShaderStageFlagBits'
import {MgSpecializationInfo} from './MgSpecializationInfo'

export class MgPipelineShaderStageCreateInfo {
  flags : number;
  stage : MgShaderStageFlagBits;
  module : IMgShaderModule;
  name : string;
  specializationInfo : MgSpecializationInfo|null;
}
