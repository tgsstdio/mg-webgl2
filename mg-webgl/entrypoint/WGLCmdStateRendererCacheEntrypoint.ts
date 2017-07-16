import {IWGLCmdStateRendererCacheEntrypoint} from './IWGLCmdStateRendererCacheEntrypoint';
import {IWGLBackbufferContext} from '../IWGLBackbufferContext';

export class WGLCmdStateRendererCacheEntrypoint
  implements IWGLCmdStateRendererCacheEntrypoint {

  private mGLContext: IWGLBackbufferContext;
  constructor(glContext:IWGLBackbufferContext) {
    this.mGLContext = glContext;
  }

  bindVAO(vao: WebGLVertexArrayObject|null): void {
    this.mGLContext.gl.bindVertexArray(vao);
  }

  bindProgram(programID:WebGLProgram|null) : void {
    this.mGLContext.gl.useProgram(programID);
  }

  setUniformBlock(
    programID:WebGLProgram
    , activeIndex:number
    , bindingPoint:number
    ) : void {
    this.mGLContext.gl.uniformBlockBinding(
      programID
      , activeIndex
      , bindingPoint);
  }

  bindCombinedImageSampler(
    programID:WebGLProgram|null
    , binding: number
    , texture: WebGLTexture|null
    , sampler: WebGLSampler|null
  ): void {
    const TEXTURE0 = 0x84C0;

    let textureSlot = TEXTURE0 + binding;
    this.mGLContext.gl.activeTexture(textureSlot)
    this.mGLContext.gl.bindTexture(textureSlot, texture);
    this.mGLContext.gl.bindSampler(binding, sampler);
  }

  // WARN: offsets requires IntPtr
  // WARN: sizes requires IntPtr
  bindUniformBuffers(
    count: number
    , buffers: Array<WebGLBuffer|null>
    , offsets: Array<number>
    , sizes: Array<number>
  ): void {
    const UNIFORM_BUFFER: number = 0x8A11;

    for (let i = 0; i < count; ++i) {
      this.mGLContext.gl.bindBufferRange(
        UNIFORM_BUFFER
        , i
        , buffers[i]
        , offsets[i]
        , sizes[i]
      );
    }
  }
}
