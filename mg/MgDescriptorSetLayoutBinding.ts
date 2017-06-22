import {MgDescriptorType} from './MgDescriptorType'
import {MgShaderStageFlagBits} from './MgShaderStageFlagBits'
import {IMgSampler} from './IMgSampler'

export class MgDescriptorSetLayoutBinding	{
  binding : number;
  descriptorType : MgDescriptorType;
  descriptorCount : number;
  stageFlags : MgShaderStageFlagBits;
  immutableSamplers : Array<IMgSampler>|null;
}