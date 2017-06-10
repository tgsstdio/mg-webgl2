/// <reference path="IWGLCmdStateRendererCacheEntrypoint.ts" />

namespace Magnesium {
  export class WGLCmdStateRendererCacheEntrypoint
    implements IWGLCmdStateRendererCacheEntrypoint {

    private mGL: WebGL2RenderingContext;
    constructor(gl:WebGL2RenderingContext) {
      this.mGL = gl;
    }

    bindVAO(vao: WebGLVertexArrayObject|null): void {
      this.mGL.bindVertexArray(vao);
    }

    bindProgram(programID:WebGLProgram|null) : void {
      this.mGL.useProgram(programID);
    }

    setUniformBlock(
      programID:WebGLProgram
      , activeIndex:number
      , bindingPoint:number
      ) : void {
      this.mGL.uniformBlockBinding(
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
      let textureSlot = this.mGL.TEXTURE0 + binding;
      this.mGL.activeTexture(textureSlot)
      this.mGL.bindTexture(textureSlot, texture);
      this.mGL.bindSampler(binding, sampler);
    }

    // WARN: offsets requires IntPtr
    // WARN: sizes requires IntPtr
		bindUniformBuffers(
      count: number
      , buffers: Array<WebGLBuffer|null>
      , offsets: Array<number>
      , sizes: Array<number>
    ): void {

      for (let i = 0; i < count; ++i) {
        this.mGL.bindBufferRange(
          this.mGL.UNIFORM_BUFFER
          , i
          , buffers[i]
          , offsets[i]
          , sizes[i]
        );
      }
    }
  }
}