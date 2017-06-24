import {IMgDescriptorSet}
	from './IMgDescriptorSet';

export class MgCopyDescriptorSet {
  srcSet : IMgDescriptorSet;
  srcBinding : number;
  srcArrayElement : number;
  dstSet : IMgDescriptorSet;
  dstBinding : number;
  dstArrayElement : number;
  descriptorCount : number;
}
