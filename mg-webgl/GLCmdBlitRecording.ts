/// <reference path="IWGLBlitOperationEntrypoint.ts" />
/// <reference path="WGLCmdBlitGrid.ts" />

namespace Magnesium {
  export class GLCmdBlitRecording {
    grid: WGLCmdBlitGrid;
    entrypoint: IWGLBlitOperationEntrypoint;

    constructor(
      grid: WGLCmdBlitGrid
      , entrypoint: IWGLBlitOperationEntrypoint
    ) {
      this.grid = grid;
      this.entrypoint = entrypoint;
    }  
  }
}