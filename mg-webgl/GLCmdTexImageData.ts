/// <reference path="../mg/MgImageType.ts" />
/// <reference path="../mg/MgFormat.ts" />

namespace Magnesium {
  export class GLCmdTexImageData {
    textureId: number;
    target: MgImageType;
    level: number;
    slice: number;
    width: number;
    height: number;
    depth: number;
    format: MgFormat;
    internalFormat: number;
    pixelFormat: number;
    pixelType: number;
    size: number;
    // WARN : data requires IntPtr
    data: any;
  }
}