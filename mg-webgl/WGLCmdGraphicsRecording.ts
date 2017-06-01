/// <reference path="IWGLCmdStateRenderer.ts" />
/// <reference path="WGLCmdGraphicsGrid.ts" />

namespace Magnesium {
  export class WGLCmdGraphicsRecording {
    grid: WGLCmdGraphicsGrid;
    stateRenderer: IWGLCmdStateRenderer;

    constructor(grid: WGLCmdGraphicsGrid
    , renderer: IWGLCmdStateRenderer)
    {
      this.grid = grid;
      this.stateRenderer = renderer;
    }    
  }
}
