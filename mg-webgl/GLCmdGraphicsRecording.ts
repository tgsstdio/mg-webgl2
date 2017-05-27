/// <reference path="IGLCmdStateRenderer.ts" />
/// <reference path="WGLCmdGraphicsGrid.ts" />

namespace Magnesium {
  export class GLCmdGraphicsRecording {
    grid: WGLCmdGraphicsGrid;
    stateRenderer: IGLCmdStateRenderer;

    constructor(grid: WGLCmdGraphicsGrid
    , renderer: IGLCmdStateRenderer)
    {
      this.grid = grid;
      this.stateRenderer = renderer;
    }    
  }
}
