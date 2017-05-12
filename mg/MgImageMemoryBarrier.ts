/// <reference path="MgAccessFlagBits.ts" />
/// <reference path="MgImageSubresourceRange.ts" />
/// <reference path="MgImageLayout.ts" />
/// <reference path="IMgImage.ts" />

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