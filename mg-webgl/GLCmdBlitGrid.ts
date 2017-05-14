namespace Magnesium {

  class GLCmdCopyBufferRecord {

  }

  class GLCmdImageInstructionSet {

  }

  export class GLCmdBlitGrid {
    copyBuffers : Array<GLCmdCopyBufferRecord>;
    loadImageOps: Array<GLCmdImageInstructionSet>;
  }
}