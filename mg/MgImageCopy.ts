/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgImageCopy {
    srcSubresource: MgImageSubresourceLayers;
    srcOffset: MgOffset3D;
    dstSubresource: MgImageSubresourceLayers;
    dstOffset: MgOffset3D;
    extent: MgExtent3D;
  }
}