import {WGLCmdGraphicsGrid} from './WGLCmdGraphicsGrid';
import {IWGLCmdStateRenderer} from './IWGLCmdStateRenderer';

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

