/// <reference path="../mg/MgPrimitiveTopology.ts" />

namespace Magnesium {
  export class GLCmdInternalDraw {
    topology: MgPrimitiveTopology;
    firstInstance: number;
    firstVertex: number;
    instanceCount: number;
    vertexCount: number;
  }
}