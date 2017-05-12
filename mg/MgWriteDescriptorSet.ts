/// <reference path="MgDescriptorImageInfo.ts" />
/// <reference path="MgDescriptorBufferInfo.ts" />
/// <reference path="IMgBufferView.ts" />

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