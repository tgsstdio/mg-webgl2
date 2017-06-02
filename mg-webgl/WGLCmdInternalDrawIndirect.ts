/// <reference path="../mg/MgPrimitiveTopology.ts" />

namespace Magnesium {
  export class WGLCmdInternalDrawIndirect {
    mode: number;
    // WARN: indirect requires IntPtr
    indirect: IWGLBuffer;
    drawCount: number;
    offset: number;
    stride: number;
  }
}