import {WGLCmdImageInstructionSet} from '../cmdbuf/WGLCmdImageInstructionSet'

export interface IWGLBlitOperationEntrypoint {
  initialize() : void;

  bindCopySrcBuffer(src:WebGLBuffer) : void;
  bindCopyDstBuffer(dst:WebGLBuffer) : void;

  copyBuffer(
      readOffset:number
    , writeOffset: number
    , size:number) : void;
  performOperation(
    instructionSet: WGLCmdImageInstructionSet) : void;
}
