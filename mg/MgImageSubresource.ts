/// <reference path="MgImageAspectFlagBits.ts" />

namespace Magnesium {
  export class MgImageSubresource {
    aspectMask : MgImageAspectFlagBits;
    mipLevel : number;
    arrayLayer : number;
  }
}