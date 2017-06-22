import {WGLCmdBlitGrid} from './WGLCmdBlitGrid'
import {IWGLBlitOperationEntrypoint} from './IWGLBlitOperationEntrypoint'

export class WGLCmdBlitRecording {
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
