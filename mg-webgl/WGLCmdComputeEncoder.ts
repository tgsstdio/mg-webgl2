/// <reference path="IWGLCmdComputeEncoder.ts" />

namespace Magnesium {
  export class WGLCmdComputeEncoder implements IWGLCmdComputeEncoder {
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

    asGrid() : WGLCmdComputeGrid {
      return new WGLCmdComputeGrid();
    }

    endEncoding(): void {

    }
  }
}