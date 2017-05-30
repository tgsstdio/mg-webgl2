/// <reference path="WGLCmdGraphicsGrid.ts" />
/// <reference path="WGLCmdComputeGrid.ts" />
/// <reference path="WGLCmdBlitGrid.ts" />
/// <reference path="WGLCmdRecordInstruction.ts" />

namespace Magnesium {
  export class WGLCmdCommandBufferRecord {
    contexts: Array<WGLCmdEncoderContext>;
    instructions: Array<WGLCmdRecordInstruction>;
    graphicsGrid: WGLCmdGraphicsGrid;
    computeGrid: WGLCmdComputeGrid;
    blitGrid: WGLCmdBlitGrid;
  }
}