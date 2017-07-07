import {WGLCmdEncoderCategory} from './WGLCmdEncoderCategory';
import {WGLCmdAction} from './WGLCmdAction';
import {WGLCmdCommandRecording} from './WGLCmdCommandRecording';

export class WGLCmdEncodingInstruction {
  index: number;
  category: WGLCmdEncoderCategory;
  operation: WGLCmdAction;

  perform(recording: WGLCmdCommandRecording) : void {
    this.operation.action(recording, this.index);
  }
}
