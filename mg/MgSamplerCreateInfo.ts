/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgSamplerCreateInfo {
    flags : number;
    magFilter : MgFilter;
    minFilter : MgFilter;
    mipmapMode : MgSamplerMipmapMode;
    addressModeU : MgSamplerAddressMode;
    addressModeV : MgSamplerAddressMode;
    addressModeW : MgSamplerAddressMode;
    mipLodBias : number;
    anisotropyEnable : boolean;
    maxAnisotropy : number;
    compareEnable : boolean;
    compareOp : MgCompareOp;
    minLod : number;
    maxLod : number;
    borderColor : MgBorderColor;
    unnormalizedCoordinates : boolean;
	}
}