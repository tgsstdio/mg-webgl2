/// <reference path="IWGLBlitOperationEntrypoint.ts" />
/// <reference path="GLCmdBlitGrid.ts" />

namespace Magnesium {
  export class GLCmdBlitRecording {
    grid: GLCmdBlitGrid;
    entrypoint: IWGLBlitOperationEntrypoint;

    constructor(
      grid: GLCmdBlitGrid
      , entrypoint: IWGLBlitOperationEntrypoint
    ) {
      this.grid = grid;
      this.entrypoint = entrypoint;
    }  
  }
}