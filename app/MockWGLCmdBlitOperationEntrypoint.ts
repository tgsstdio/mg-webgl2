import {IWGLBlitOperationEntrypoint} from '../mg-webgl/entrypoint/IWGLBlitOperationEntrypoint';
import {IWGLBuffer} from '../mg-webgl/IWGLBuffer';
import {WGLCmdImageInstructionSet} from '../mg-webgl/cmdbuf/WGLCmdImageInstructionSet';

export class MockWGLCmdBlitOperationEntrypoint implements IWGLBlitOperationEntrypoint {
  initialize() : void {

  }

  getBufferSubData(src:IWGLBuffer, srcOffset:number, srcSize: number, dst: Uint8Array) : void {

  }

  setBufferSubData(src:Uint8Array, dst:IWGLBuffer, dstOffset:number, dstSize: number) : void {

  }

  bindCopySrcBuffer(src:IWGLBuffer) : void {

  }

  bindCopyDstBuffer(dst:IWGLBuffer) : void {

  }

  unbindCopySrcBuffer(src:IWGLBuffer) : void {

  }

  unbindCopyDstBuffer(dst:IWGLBuffer) : void {

  }

  copyBuffer(
    src:IWGLBuffer
    , dst:IWGLBuffer    
    , readOffset:number
    , writeOffset: number
    , size:number) : void {

    }

  performOperation(
    instructionSet: WGLCmdImageInstructionSet) : void {

    }
}