/// <reference path="MgExtent3D.ts" />
/// <reference path="MgSampleCountFlagBits.ts" />

namespace Magnesium {
  export class MgImageFormatProperties {
    maxExtent: MgExtent3D;
    maxMipLevels: number;
    maxArrayLayers: number;
    sampleCounts: MgSampleCountFlagBits;
    // WARN: maxResourceSize requires UInt64
    maxResourceSize: number;
  }
}