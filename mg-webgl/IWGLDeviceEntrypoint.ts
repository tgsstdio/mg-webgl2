namespace Magnesium {
  export interface IWGLDeviceEntrypoint {
    readonly deviceMemory : IWGLDeviceMemoryEntrypoint;
    readonly image: IWGLDeviceImageEntrypoint;
    readonly graphicsCompiler: IWGLGraphicsPipelineCompiler;
    readonly graphicsPipeline: IWGLGraphicsPipelineEntrypoint;
    readonly sampler: IWGLSamplerEntrypoint;
    readonly descriptorPool: IWGLDescriptorPoolEntrypoint;
    readonly descriptorSet: IWGLDescriptorSetEntrypoint;
    readonly vertexArrays: IWGLCmdVertexArrayEntrypoint;
    readonly imageFormat: IWGLImageFormatEntrypoint;
    readonly semaphores: IWGLSemaphoreEntrypoint;
    readonly fences: IWGLFenceEntrypoint;
    readonly buffers: IWGLBufferEntrypoint;
  }
}