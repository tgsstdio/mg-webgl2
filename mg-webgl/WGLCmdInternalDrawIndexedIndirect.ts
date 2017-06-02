/// <reference path="../mg/MgIndexType.ts" />
/// <reference path="../mg/MgPrimitiveTopology.ts" />

namespace Magnesium {
  export class WGLCmdInternalDrawIndexedIndirect {
    mode: number;
    topology: MgPrimitiveTopology;
    indexType: MgIndexType;
    elementType: number;
    indexByteSize: number;
    // WARN: indirect requires IntPtr    
    indirect: IWGLBuffer;
    drawCount: number;
    offset: number;
    stride: number;
  }
}