/// <reference path="IGLCmdComputeEncoder.ts" />

namespace Magnesium {
  export class GLCmdComputeEncoder implements IGLCmdComputeEncoder {
    dispatch(x: number, y: number, z: number) : never {
      throw new Error('Not implemented');
    }

    dispatchIndirect(x: number, y: number, z: number) : never {
      throw new Error('Not implemented');
    }

    bindPipeline(pipeline: IMgPipeline) : never {
      throw new Error('Not implemented');
    }
    clear(): void {

    }

    asGrid() : GLCmdComputeGrid {
      return new GLCmdComputeGrid();
    }

    endEncoding(): void {

    }
  }
}