/// <reference path="MgSparseImageFormatFlagBits.ts" />
/// <reference path="MgImageAspectFlagBits.ts" />
/// <reference path="MgExtent3D.ts" />

namespace Magnesium {
  export class MgSparseImageFormatProperties {
    aspectMask: MgImageAspectFlagBits;
    imageGranularity: MgExtent3D;
    flags: MgSparseImageFormatFlagBits;
  }
}