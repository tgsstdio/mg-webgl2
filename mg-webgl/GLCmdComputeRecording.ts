/// <reference path="GLCmdComputeEncoder.ts" />
/// <reference path="GLCmdComputeGrid.ts" />

namespace Magnesium {
  export class GLCmdComputeRecording {
    grid: GLCmdComputeGrid;
    encoder: IGLCmdComputeEncoder;

    constructor(
      grid: GLCmdComputeGrid
      , encoder: IGLCmdComputeEncoder
    ) {
      this.grid = grid;
      this.encoder = encoder;
    }
  }
}
