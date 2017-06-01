/// <reference path="WGLCmdComputeRecording.ts" />
/// <reference path="WGLCmdGraphicsRecording.ts" />
/// <reference path="GLCmdBlitRecording.ts" />

namespace Magnesium {
  export class WGLCmdCommandRecording {
    compute: WGLCmdComputeRecording;
    graphics: WGLCmdGraphicsRecording;
    blit: GLCmdBlitRecording;

    constructor(
      compute: WGLCmdComputeRecording
      , graphics: WGLCmdGraphicsRecording
      , blit: GLCmdBlitRecording
      ) {
        this.compute = compute;
        this.graphics = graphics;
        this.blit = blit;
      }
  }
}