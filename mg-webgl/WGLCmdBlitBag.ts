import {WGLCmdEncoderCollection} from './WGLCmdEncoderCollection';
import {WGLCmdCopyBufferRecord} from './WGLCmdCopyBufferRecord';
import {WGLCmdImageInstructionSet} from './WGLCmdImageInstructionSet';

export class WGLCmdBlitBag {
  copyBuffers: WGLCmdEncoderCollection<WGLCmdCopyBufferRecord>;
  loadImageOps: WGLCmdEncoderCollection<WGLCmdImageInstructionSet>;

  constructor() {
    this.copyBuffers = new WGLCmdEncoderCollection<WGLCmdCopyBufferRecord>();
    this.loadImageOps = new WGLCmdEncoderCollection<WGLCmdImageInstructionSet>();
  }

  clear(): void {
    this.copyBuffers.clear();
    this.loadImageOps.clear();
  }
}
