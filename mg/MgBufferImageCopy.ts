/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgBufferImageCopy {
    // WARN: bufferOffset requires UInt64
    bufferOffset: number;
    bufferRowLength: number;
    bufferImageHeight: number;
    imageSubresource: MgImageSubresourceLayers;
    imageOffset: MgOffset3D;
    imageExtent: MgExtent3D;
  }
}