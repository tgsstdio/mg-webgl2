/// <reference path="MgImageCreateFlagBits.ts" />
/// <reference path="MgImageType.ts" />
/// <reference path="MgFormat.ts" />
/// <reference path="MgExtent3D.ts" />
/// <reference path="MgSampleCountFlagBits.ts" />
/// <reference path="MgImageTiling.ts" />
/// <reference path="MgImageUsageFlagBits.ts" />
/// <reference path="MgSharingMode.ts" />
/// <reference path="MgImageLayout.ts" />

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