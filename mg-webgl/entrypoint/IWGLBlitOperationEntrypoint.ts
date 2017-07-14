import {WGLCmdImageInstructionSet} from '../cmdbuf/WGLCmdImageInstructionSet'
import {IWGLBuffer} from '../IWGLBuffer'

export interface IWGLBlitOperationEntrypoint {
  initialize() : void;

  bindCopySrcBuffer(src:IWGLBuffer) : void;
  bindCopyDstBuffer(dst:IWGLBuffer) : void;

  unbindCopySrcBuffer(src:IWGLBuffer) : void;
  unbindCopyDstBuffer(dst:IWGLBuffer) : void;

  copyBuffer(    
      readOffset:number
    , writeOffset: number
    , size:number) : void;
  performOperation(
    instructionSet: WGLCmdImageInstructionSet) : void;
}
