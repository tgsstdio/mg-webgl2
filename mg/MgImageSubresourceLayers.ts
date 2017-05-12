/// <reference path="MgImageAspectFlagBits.ts" />

namespace Magnesium {
  export class MgImageSubresourceLayers {
    aspectMask: MgImageAspectFlagBits;
    mipLevel: number;
    baseArrayLayer: number;
    layerCount: number;
  }
}