import {IMgDescriptorPool} from './IMgDescriptorPool'
import {IMgDescriptorSetLayout} from './IMgDescriptorSetLayout'

export class MgDescriptorSetAllocateInfo {
  descriptorSetCount : number;
  descriptorPool : IMgDescriptorPool;
  setLayouts : Array<IMgDescriptorSetLayout>;
}