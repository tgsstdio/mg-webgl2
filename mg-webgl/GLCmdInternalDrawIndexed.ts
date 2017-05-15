/// <reference path="../mg/MgPrimitiveTopology.ts" />
/// <reference path="../mg/MgIndexType.ts" />

namespace Magnesium {
  export class GLCmdInternalDrawIndexed {
    firstInstance: number;
    vertexOffset: number;
    firstIndex: number;
    instanceCount: number;
    indexCount: number;
    topology: MgPrimitiveTopology;
    indexType: MgIndexType;
  }
}