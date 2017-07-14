import {IWGLBlitOperationEntrypoint}
	from './IWGLBlitOperationEntrypoint';
import {WGLCmdImageInstructionSet}
	from '../cmdbuf/WGLCmdImageInstructionSet';
import {IWGLBuffer}
	from '../IWGLBuffer';

export class WGLBlitOperationEntrypoint implements IWGLBlitOperationEntrypoint {
  private mGL: WebGL2RenderingContext;
  constructor(gl : WebGL2RenderingContext) {
    this.mGL = gl;
  }

  bindCopySrcBuffer(src:IWGLBuffer) : void {
    if (src.bestBufferTarget != null) {
      let target = src.bestBufferTarget as number;
      this.mGL.bindBuffer(target, src.deviceMemory);
    }
  }

  bindCopyDstBuffer(dst:IWGLBuffer) : void {
    if (dst.bestBufferTarget != null) {
      let target = dst.bestBufferTarget as number;
      this.mGL.bindBuffer(target, dst.deviceMemory);
    }
  }

  initialize() : void {
    this.mGL.enable(this.mGL.TEXTURE_2D);
  }

  copyBuffer(
     readOffset:number
    , writeOffset: number
    , size:number
  ) : void {
    this.mGL.copyBufferSubData(
      this.mGL.COPY_READ_BUFFER
      , this.mGL.COPY_WRITE_BUFFER
      , readOffset
      , writeOffset
      , size);
  }

  unbindCopySrcBuffer(src:IWGLBuffer) : void {
    this.mGL.bindBuffer(this.mGL.COPY_READ_BUFFER, null);
  }

  unbindCopyDstBuffer(dst:IWGLBuffer) : void {
    this.mGL.bindBuffer(this.mGL.COPY_WRITE_BUFFER, null);
  }

  performOperation(instructionSet: WGLCmdImageInstructionSet) : void {

  }
}
