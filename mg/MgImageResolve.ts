/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgImageResolve {
    srcSubresource: MgImageSubresourceLayers;
    srcOffset: MgOffset3D;
    dstSubresource: MgImageSubresourceLayers;
    dstOffset: MgOffset3D;
    extent: MgExtent3D;
  }
}