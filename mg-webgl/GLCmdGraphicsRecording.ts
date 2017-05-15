/// <reference path="IGLCmdStateRenderer.ts" />
/// <reference path="GLCmdGraphicsGrid.ts" />

namespace Magnesium {
  export class GLCmdGraphicsRecording {
    grid: GLCmdGraphicsGrid;
    stateRenderer: IGLCmdStateRenderer;

    constructor(grid: GLCmdGraphicsGrid
    , renderer: IGLCmdStateRenderer)
    {
      this.grid = grid;
      this.stateRenderer = renderer;
    }    
  }
}
