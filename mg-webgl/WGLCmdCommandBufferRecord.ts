/// <reference path="WGLCmdGraphicsGrid.ts" />
/// <reference path="WGLCmdComputeGrid.ts" />
/// <reference path="WGLCmdBlitGrid.ts" />
/// <reference path="GLCmdRecordInstruction.ts" />

namespace Magnesium {
  export class WGLCmdCommandBufferRecord {
    contexts: Array<WGLCmdEncoderContext>;
    instructions: Array<GLCmdRecordInstruction>;
    graphicsGrid: WGLCmdGraphicsGrid;
    computeGrid: WGLCmdComputeGrid;
    blitGrid: WGLCmdBlitGrid;
  }
}