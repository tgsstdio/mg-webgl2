/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgImageMemoryBarrier {
    srcAccessMask: MgAccessFlagBits;
    dstAccessMask: MgAccessFlagBits;
    oldLayout: MgImageLayout;
    newLayout: MgImageLayout;
    srcQueueFamilyIndex: number;
    dstQueueFamilyIndex: number;
    image: IMgImage;
    subresourceRange: MgImageSubresourceRange;
  }
}