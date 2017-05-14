/// <reference path="./GLCmdGraphicsGrid.ts" />
/// <reference path="./GLCmdComputeGrid.ts" />
/// <reference path="./GLCmdBlitGrid.ts" />

namespace Magnesium {
  export class GLCmdCommandBufferRecord {
    contexts: Array<GLCmdEncoderContext>;
    instructions: Array<GLCmdRecordInstruction>;
    graphicsGrid: GLCmdGraphicsGrid;
    computeGrid: GLCmdComputeGrid;
    blitGrid: GLCmdBlitGrid;
  }
}