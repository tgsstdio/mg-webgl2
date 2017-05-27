namespace Magnesium {

  class GLCmdCopyBufferRecord {

  }

  class GLCmdImageInstructionSet {

  }

  export class WGLCmdBlitGrid {
    copyBuffers : Array<GLCmdCopyBufferRecord>;
    loadImageOps: Array<GLCmdImageInstructionSet>;
  }
}