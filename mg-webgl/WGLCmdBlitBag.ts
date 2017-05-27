namespace Magnesium {
  export class GLCmdCopyBufferRecord {

  }

  export class WGLCmdBlitBag {
    copyBuffers: WGLCmdEncoderCollection<GLCmdCopyBufferRecord>;
    loadImageOps: WGLCmdEncoderCollection<GLCmdImageInstructionSet>;

    constructor() {
      this.copyBuffers = new WGLCmdEncoderCollection<GLCmdCopyBufferRecord>();
      this.loadImageOps = new WGLCmdEncoderCollection<GLCmdImageInstructionSet>();
    }

    clear(): void {
      this.copyBuffers.clear();
      this.loadImageOps.clear();
    }
  }
}