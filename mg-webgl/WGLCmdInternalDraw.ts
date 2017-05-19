/// <reference path="../mg/MgPrimitiveTopology.ts" />

namespace Magnesium {
  export class WGLCmdInternalDraw {
    topology: MgPrimitiveTopology;
    firstVertex: number;
    instanceCount: number;
    vertexCount: number;
  }
}