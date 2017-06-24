import {WGLCmdEncoderCategory} from './WGLCmdEncoderCategory';
import {WGLCmdAction} from './WGLCmdAction';

export class WGLCmdEncodingInstruction {
  index: number;
  category: WGLCmdEncoderCategory;
  operation: WGLCmdAction;
}
