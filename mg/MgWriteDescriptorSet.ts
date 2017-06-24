import {IMgDescriptorSet}
	from './IMgDescriptorSet';	
import {MgDescriptorType}
	from './MgDescriptorType';
import {MgDescriptorImageInfo}
	from './MgDescriptorImageInfo';
import {MgDescriptorBufferInfo}
	from './MgDescriptorBufferInfo';
import {IMgBufferView}
	from './IMgBufferView';  

export class MgWriteDescriptorSet	{
  dstSet : IMgDescriptorSet;
  dstBinding : number;
  dstArrayElement : number;
  descriptorCount : number;
  descriptorType : MgDescriptorType;
  imageInfo : Array<MgDescriptorImageInfo>;
  bufferInfo : Array<MgDescriptorBufferInfo>;
  texelBufferView : Array<IMgBufferView>;
}
