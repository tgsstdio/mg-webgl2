import {WGLCmdEncoderContext} from './WGLCmdEncoderContext';
import {WGLCmdRecordInstruction} from './WGLCmdRecordInstruction';
import {WGLCmdGraphicsGrid} from './WGLCmdGraphicsGrid';
import {WGLCmdComputeGrid} from './WGLCmdComputeGrid';
import {WGLCmdBlitGrid} from './WGLCmdBlitGrid';

export class WGLCmdCommandBufferRecord {
  contexts: Array<WGLCmdEncoderContext>;
  instructions: Array<WGLCmdRecordInstruction>;
  graphicsGrid: WGLCmdGraphicsGrid;
  computeGrid: WGLCmdComputeGrid;
  blitGrid: WGLCmdBlitGrid;
}
