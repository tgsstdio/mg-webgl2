/// <reference path="../mg/MgPrimitiveTopology.ts" />

namespace Magnesium {
  export class WGLCmdInternalDraw {
    mode: MgPrimitiveTopology;
    firstVertex: number;
    indicesCount: number;
    instanceCount: number;
  }
}