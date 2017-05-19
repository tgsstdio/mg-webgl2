/// <reference path="GLCmdGraphicsGrid.ts" />
/// <reference path="GLCmdComputeGrid.ts" />
/// <reference path="GLCmdBlitGrid.ts" />
/// <reference path="GLCmdRecordInstruction.ts" />

namespace Magnesium {
  export class WGLCmdCommandBufferRecord {
    contexts: Array<WGLCmdEncoderContext>;
    instructions: Array<GLCmdRecordInstruction>;
    graphicsGrid: GLCmdGraphicsGrid;
    computeGrid: GLCmdComputeGrid;
    blitGrid: GLCmdBlitGrid;
  }
}