import {WGLCmdComputeRecording} from './WGLCmdComputeRecording';
import {WGLCmdGraphicsRecording} from './WGLCmdGraphicsRecording';
import {WGLCmdBlitRecording} from './WGLCmdBlitRecording';

export class WGLCmdCommandRecording {
  compute: WGLCmdComputeRecording;
  graphics: WGLCmdGraphicsRecording;
  blit: WGLCmdBlitRecording;

  constructor(
    compute: WGLCmdComputeRecording
    , graphics: WGLCmdGraphicsRecording
    , blit: WGLCmdBlitRecording
    ) {
      this.compute = compute;
      this.graphics = graphics;
      this.blit = blit;
    }
}
