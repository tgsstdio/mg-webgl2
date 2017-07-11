import {WGLCmdComputeGrid} from './WGLCmdComputeGrid';
import {IWGLCmdComputeEncoder} from './IWGLCmdComputeEncoder'

export class WGLCmdComputeRecording {
  grid: WGLCmdComputeGrid;
  encoder: IWGLCmdComputeEncoder;

  constructor(
    grid: WGLCmdComputeGrid
    , encoder: IWGLCmdComputeEncoder
  ) {
    this.grid = grid;
    this.encoder = encoder;
  }
}

