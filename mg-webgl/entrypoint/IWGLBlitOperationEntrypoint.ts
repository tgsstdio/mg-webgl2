import {WGLCmdImageInstructionSet} from '../cmdbuf/WGLCmdImageInstructionSet'
import {IWGLBuffer} from '../IWGLBuffer'

export interface IWGLBlitOperationEntrypoint {
  initialize() : void;

  getBufferSubData(src:IWGLBuffer, srcOffset:number, srcSize: number, dst: Uint8Array) : void;
  setBufferSubData(src:Uint8Array, dst:IWGLBuffer, dstOffset:number, dstSize: number) : void;

  bindCopySrcBuffer(src:IWGLBuffer) : void;
  bindCopyDstBuffer(dst:IWGLBuffer) : void;

  unbindCopySrcBuffer(src:IWGLBuffer) : void;
  unbindCopyDstBuffer(dst:IWGLBuffer) : void;

  copyBuffer(
    src:IWGLBuffer
    , dst:IWGLBuffer    
    , readOffset:number
    , writeOffset: number
    , size:number) : void;
  performOperation(
    instructionSet: WGLCmdImageInstructionSet) : void;
}
