/// <reference path="../mg/IMgPipeline.ts" />
/// <reference path="./WGLCmdComputeGrid.ts" />

namespace Magnesium {
  export interface IWGLCmdComputeEncoder {
    dispatch(x: number, y: number, z: number) : void;
    dispatchIndirect(x: number, y: number, z: number) : void;
    bindPipeline(pipeline: IMgPipeline) : void;
    clear(): void;
    asGrid() : WGLCmdComputeGrid;
    endEncoding(): void;
  }
}