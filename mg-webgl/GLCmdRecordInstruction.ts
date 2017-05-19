/// <reference path="GLCmdAction.ts" />
/// <reference path="GLCmdCommandRecording.ts" />

namespace Magnesium {
  export class GLCmdRecordInstruction {
    index: number;
    operation: WGLCmdAction;

    perform(recording: GLCmdCommandRecording): void {
      this.operation.action(recording, this.index);
    }
  }
}