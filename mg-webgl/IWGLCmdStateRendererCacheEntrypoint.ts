
export interface IWGLCmdStateRendererCacheEntrypoint {
  bindVAO(vao: WebGLVertexArrayObject|null): void;
  bindProgram(programID:WebGLProgram|null) : void;
  setUniformBlock(programID:WebGLProgram
    , activeIndex:number
    , bindingPoint:number) : void;

  bindCombinedImageSampler(
    programID:WebGLProgram|null
    , binding: number
    , texture: WebGLTexture|null
    , sampler: WebGLSampler|null): void;

  // WARN: offsets requires IntPtr
  // WARN: sizes requires IntPtr
  bindUniformBuffers(
    count: number
    , buffers: Array<WebGLBuffer|null>
    , offsets: Array<number>
    , sizes: Array<number>
  ): void;      
}
