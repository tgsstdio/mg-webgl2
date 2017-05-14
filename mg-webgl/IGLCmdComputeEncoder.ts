/// <reference path="../mg/IMgPipeline.ts" />
/// <reference path="GLCmdComputeGrid.ts" />

namespace Magnesium {
  export interface IGLCmdComputeEncoder {
    dispatch(x: number, y: number, z: number) : void;
    dispatchIndirect(x: number, y: number, z: number) : void;
    bindPipeline(pipeline: IMgPipeline) : void;
    clear(): void;
    asGrid() : GLCmdComputeGrid;
    endEncoding(): void;
  }
}