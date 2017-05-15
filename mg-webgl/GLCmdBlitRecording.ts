/// <reference path="IGLBlitOperationEntrypoint.ts" />
/// <reference path="GLCmdBlitGrid.ts" />

namespace Magnesium {
  export class GLCmdBlitRecording {
    grid: GLCmdBlitGrid;
    entrypoint: IGLBlitOperationEntrypoint;

    constructor(
      grid: GLCmdBlitGrid
      , entrypoint: IGLBlitOperationEntrypoint
    ) {
      this.grid = grid;
      this.entrypoint = entrypoint;
    }  
  }
}