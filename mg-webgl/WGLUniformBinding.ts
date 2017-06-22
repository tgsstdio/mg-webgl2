import {MgDescriptorType} from '../mg/MgDescriptorType'
import {MgShaderStageFlagBits} from '../mg/MgShaderStageFlagBits'

export class WGLUniformBinding {
  descriptorCount: number;
  descriptorType: MgDescriptorType;
  binding: number;
  stageFlags: MgShaderStageFlagBits;
}
