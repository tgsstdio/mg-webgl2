import {IWGLBlitOperationEntrypoint}
	from './IWGLBlitOperationEntrypoint';
import {WGLCmdImageInstructionSet}
	from '../cmdbuf/WGLCmdImageInstructionSet';
import {IWGLBuffer}
	from '../IWGLBuffer';
import {IWGLBackbufferContext}
  from '../IWGLBackbufferContext';
import {IWGLErrorHandler}
  from './IWGLErrorHandler';

export class WGLBlitOperationEntrypoint implements IWGLBlitOperationEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  private mErrorHandler: IWGLErrorHandler;
  constructor(
    glContext : IWGLBackbufferContext
    , errorHandler: IWGLErrorHandler
  ) {
    this.mGLContext = glContext;
    this.mErrorHandler = errorHandler;
  }

  bindCopySrcBuffer(src:IWGLBuffer) : void {
    if (src.bestBufferTarget != null) {
      let target = src.bestBufferTarget as number;
      this.mGLContext.gl.bindBuffer(target, src.deviceMemory);
      this.mErrorHandler.checkError();      
    }
  }

  bindCopyDstBuffer(dst:IWGLBuffer) : void {
    if (dst.bestBufferTarget != null) {
      let target = dst.bestBufferTarget as number;
      this.mGLContext.gl.bindBuffer(target, dst.deviceMemory);
      this.mErrorHandler.checkError();      
    }
  }

  initialize() : void {
    const TEXTURE_2D: number = 0x0DE1;

    this.mGLContext.gl.enable(TEXTURE_2D);
    this.mErrorHandler.checkError();    
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
      this.mErrorHandler.checkError();        
    }
  }

  unbindCopySrcBuffer(src:IWGLBuffer) : void {
    if (src.bestBufferTarget != null) {
      let target = src.bestBufferTarget as number;      
      this.mGLContext.gl.bindBuffer(target, null);
      this.mErrorHandler.checkError();      
    }
  }

  unbindCopyDstBuffer(dst:IWGLBuffer) : void {
    if (dst.bestBufferTarget != null) {
      let target = dst.bestBufferTarget as number;
      this.mGLContext.gl.bindBuffer(target, null);
      this.mErrorHandler.checkError();
    }
  }

  performOperation(instructionSet: WGLCmdImageInstructionSet) : void {

  }
}
