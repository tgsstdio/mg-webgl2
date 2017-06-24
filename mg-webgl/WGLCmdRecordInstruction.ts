import {WGLCmdAction} from './WGLCmdAction'
import {WGLCmdCommandRecording} from './WGLCmdCommandRecording'

export class WGLCmdRecordInstruction {
  index: number;
  operation: WGLCmdAction;

  perform(recording: WGLCmdCommandRecording): void {
    this.operation.action(recording, this.index);
  }
}
