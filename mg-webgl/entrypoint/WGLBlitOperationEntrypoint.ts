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

  getBufferSubData(
    src:IWGLBuffer
    , srcOffset:number
    , srcSize: number
    , dst: Uint8Array
  ) : void {
    let target = this.getSrcTarget(src);

    this.mGLContext.gl.getBufferSubData(target, srcOffset, dst, 0, srcSize);
  }

  setBufferSubData(src:Uint8Array, dst:IWGLBuffer, dstOffset:number, dstSize: number) : void {
    let target = this.getSrcTarget(dst);
    
    this.mGLContext.gl.bufferSubData(target, dstOffset, src, 0, dstSize);
  }

  bindCopySrcBuffer(src:IWGLBuffer) : void {
    if (src.bestBufferTarget != null) {
      let target = this.getSrcTarget(src);  

      this.mGLContext.gl.bindBuffer(target, src.deviceMemory);
      this.mErrorHandler.checkError();      
    }
  }

  private getSrcTarget(src:IWGLBuffer): number {
    return src.bestBufferTarget as number;
  }

  bindCopyDstBuffer(dst:IWGLBuffer) : void {
    if (dst.bestBufferTarget != null) {
      const COPY_WRITE_BUFFER = 0x8F37;       

      this.mGLContext.gl.bindBuffer(COPY_WRITE_BUFFER, dst.deviceMemory);
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
      const COPY_WRITE_BUFFER = 0x8F37;  
      
      let srcTarget = this.getSrcTarget(src);        

      this.mGLContext.gl.copyBufferSubData(
        srcTarget
        , COPY_WRITE_BUFFER
        , readOffset
        , writeOffset
        , size);
      this.mErrorHandler.checkError();        
    }
  }

  unbindCopySrcBuffer(src:IWGLBuffer) : void {
    if (src.bestBufferTarget != null) {
      let srcTarget = this.getSrcTarget(src);      
      
      this.mGLContext.gl.bindBuffer(srcTarget, null);
      this.mErrorHandler.checkError();      
    }
  }

  unbindCopyDstBuffer(dst:IWGLBuffer) : void {
    if (dst.bestBufferTarget != null) {
      const COPY_WRITE_BUFFER = 0x8F37; 
      this.mGLContext.gl.bindBuffer(COPY_WRITE_BUFFER, null);
      this.mErrorHandler.checkError();
    }
  }

  performOperation(instructionSet: WGLCmdImageInstructionSet) : void {

  }
}
