import {MgDescriptorSetLayoutBinding} from './MgDescriptorSetLayoutBinding'

export class MgDescriptorSetLayoutCreateInfo {
  flags : number;
  bindings : Array<MgDescriptorSetLayoutBinding>;
}
