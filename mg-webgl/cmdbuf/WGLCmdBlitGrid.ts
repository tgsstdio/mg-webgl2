import {WGLCmdCopyBufferRecord} from './WGLCmdCopyBufferRecord'
import {WGLCmdImageInstructionSet} from './WGLCmdImageInstructionSet'

export class WGLCmdBlitGrid {
  copyBuffers : Array<WGLCmdCopyBufferRecord>;
  loadImageOps: Array<WGLCmdImageInstructionSet>;
}
