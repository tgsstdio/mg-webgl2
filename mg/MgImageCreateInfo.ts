/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgImageCreateInfo {
    flags : MgImageCreateFlagBits;
    imageType : MgImageType;
    format : MgFormat;
    extent : MgExtent3D;
    mipLevels : number;
    arrayLayers : number;
    samples : MgSampleCountFlagBits;
    tiling : MgImageTiling;
    usage : MgImageUsageFlagBits;
    sharingMode : MgSharingMode;
    queueFamilyIndices : Array<number>;
    initialLayout : MgImageLayout;
  }
}