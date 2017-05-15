/// <reference path="../mg/MgIndexType.ts" />
/// <reference path="../mg/MgPrimitiveTopology.ts" />

namespace Magnesium {
  export class GLCmdInternalDrawIndexedIndirect {
    // WARN: indirect requires IntPtr
    indirect: any;
    topology: MgPrimitiveTopology;
    indexType: MgIndexType;
    stride: number;
    drawCount: number;
  }
}