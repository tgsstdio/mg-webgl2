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

  bindCopySrcBuffer(src:WebGLBuffer) : void {
    this.mGL.bindBuffer(this.mGL.COPY_READ_BUFFER, src);
  }

  bindCopyDstBuffer(dst:WebGLBuffer) : void {
    this.mGL.bindBuffer(this.mGL.COPY_WRITE_BUFFER, dst);
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

  performOperation(instructionSet: WGLCmdImageInstructionSet) : void {

  }
}
