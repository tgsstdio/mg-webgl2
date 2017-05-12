/// <reference path="MgOffset3D.ts" />
/// <reference path="MgImageSubresourceLayers.ts" />
/// <reference path="MgExtent3D.ts" />

namespace Magnesium {
  export class MgImageResolve {
    srcSubresource: MgImageSubresourceLayers;
    srcOffset: MgOffset3D;
    dstSubresource: MgImageSubresourceLayers;
    dstOffset: MgOffset3D;
    extent: MgExtent3D;
  }
}