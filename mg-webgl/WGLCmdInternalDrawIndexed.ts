/// <reference path="../mg/MgPrimitiveTopology.ts" />
/// <reference path="../mg/MgIndexType.ts" />

namespace Magnesium {
  export class WGLCmdInternalDrawIndexed {
    mode: number;
    elementCount: number;
    elementType: number;
    indexOffset: number;
    instanceCount: MgIndexType;
  }
}