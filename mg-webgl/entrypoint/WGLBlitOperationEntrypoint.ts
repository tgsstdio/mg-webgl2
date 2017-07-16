import {IWGLBlitOperationEntrypoint}
	from './IWGLBlitOperationEntrypoint';
import {WGLCmdImageInstructionSet}
	from '../cmdbuf/WGLCmdImageInstructionSet';
import {IWGLBuffer}
	from '../IWGLBuffer';
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';

export class WGLBlitOperationEntrypoint implements IWGLBlitOperationEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  constructor(glContext : IWGLBackbufferContext) {
    this.mGLContext = glContext;
  }

  bindCopySrcBuffer(src:IWGLBuffer) : void {
    if (src.bestBufferTarget != null) {
      let target = src.bestBufferTarget as number;
      this.mGLContext.gl.bindBuffer(target, src.deviceMemory);
    }
  }

  bindCopyDstBuffer(dst:IWGLBuffer) : void {
    if (dst.bestBufferTarget != null) {
      let target = dst.bestBufferTarget as number;
      this.mGLContext.gl.bindBuffer(target, dst.deviceMemory);
    }
  }

  initialize() : void {
    const TEXTURE_2D: number = 0x0DE1;

    this.mGLContext.gl.enable(TEXTURE_2D);
  }

  copyBuffer(
    src:IWGLBuffer
    , dst:IWGLBuffer
    , readOffset:number
    , writeOffset: number
    , size:number
  ) : void {
    if (src.bestBufferTarget != null && dst.bestBufferTarget != null) {
      let srcTarget = src.bestBufferTarget as number;
      let dstTarget = dst.bestBufferTarget as number;      

      this.mGLContext.gl.copyBufferSubData(
        srcTarget
        , dstTarget
        , readOffset
        , writeOffset
        , size);
    }
  }

  unbindCopySrcBuffer(src:IWGLBuffer) : void {
    if (src.bestBufferTarget != null) {
      let target = src.bestBufferTarget as number;      
      this.mGLContext.gl.bindBuffer(target, null);
    }
  }

  unbindCopyDstBuffer(dst:IWGLBuffer) : void {
    if (dst.bestBufferTarget != null) {
      let target = dst.bestBufferTarget as number;
      this.mGLContext.gl.bindBuffer(target, null);
    }
  }

  performOperation(instructionSet: WGLCmdImageInstructionSet) : void {

  }
}
