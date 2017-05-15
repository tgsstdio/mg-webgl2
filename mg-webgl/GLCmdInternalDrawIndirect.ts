/// <reference path="../mg/MgPrimitiveTopology.ts" />

namespace Magnesium {
  export class GLCmdInternalDrawIndirect {
    stride: number;
    drawCount: number;
    topology: MgPrimitiveTopology;
    // WARN: indirect requires IntPtr
    indirect: any;
  }
}