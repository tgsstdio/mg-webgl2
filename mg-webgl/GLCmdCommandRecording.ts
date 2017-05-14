/// <reference path="GLCmdComputeRecording.ts" />
/// <reference path="GLCmdGraphicsRecording.ts" />
/// <reference path="GLCmdBlitRecording.ts" />

namespace Magnesium {
  export class GLCmdCommandRecording {
    compute: GLCmdComputeRecording;
    graphics: GLCmdGraphicsRecording;
    blit: GLCmdBlitRecording;

    constructor(
      compute: GLCmdComputeRecording
      , graphics: GLCmdGraphicsRecording
      , blit: GLCmdBlitRecording
      ) {
        this.compute = compute;
        this.graphics = graphics;
        this.blit = blit;
      }
  }
}