/// <reference path="Magnesium.ts" />

namespace Magnesium {
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
}