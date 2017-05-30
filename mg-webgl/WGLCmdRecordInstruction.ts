/// <reference path="WGLCmdAction.ts" />
/// <reference path="WGLCmdCommandRecording.ts" />

namespace Magnesium {
  export class WGLCmdRecordInstruction {
    index: number;
    operation: WGLCmdAction;

    perform(recording: WGLCmdCommandRecording): void {
      this.operation.action(recording, this.index);
    }
  }
}