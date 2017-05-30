/// <reference path="WGLCmdComputeEncoder.ts" />
/// <reference path="WGLCmdComputeGrid.ts" />

namespace Magnesium {
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
}
