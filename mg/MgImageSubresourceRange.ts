/// <reference path="MgImageAspectFlagBits.ts" />

namespace Magnesium {
  export class MgImageSubresourceRange {
    aspectMask : MgImageAspectFlagBits;
    baseMipLevel : number;
    levelCount : number;
    baseArrayLayer : number;
    layerCount : number;
	}
}