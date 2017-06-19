namespace Magnesium {
  export class WGLDeviceEntrypoint implements IWGLDeviceEntrypoint {
    private mDeviceMemory: IWGLDeviceMemoryEntrypoint;
    private mImage: IWGLDeviceImageEntrypoint;
    private mGraphicsCompiler: IWGLGraphicsPipelineCompiler;
    private mGraphicsPipeline: IWGLGraphicsPipelineEntrypoint;
    private mSampler: IWGLSamplerEntrypoint;
    private mDescriptorPool: IWGLDescriptorPoolEntrypoint;
    private mDescriptorSet: IWGLDescriptorSetEntrypoint;
    private mVertexArrays: IWGLCmdVertexArrayEntrypoint;
    private mImageFormat: IWGLImageFormatEntrypoint;
    private mSemaphores: IWGLSemaphoreEntrypoint;
    private mFences: IWGLFenceEntrypoint;
    private mBuffers: IWGLBufferEntrypoint;

    constructor(
      deviceMemory: IWGLDeviceMemoryEntrypoint
      , image: IWGLDeviceImageEntrypoint
      , graphicsCompiler: IWGLGraphicsPipelineCompiler
      , graphicsPipeline: IWGLGraphicsPipelineEntrypoint
      , sampler: IWGLSamplerEntrypoint
      , descriptorPool: IWGLDescriptorPoolEntrypoint
      , descriptorSet: IWGLDescriptorSetEntrypoint
      , vertexArrays: IWGLCmdVertexArrayEntrypoint
      , imageFormat: IWGLImageFormatEntrypoint
      , semaphores: IWGLSemaphoreEntrypoint
      , fences: IWGLFenceEntrypoint
      , buffers: IWGLBufferEntrypoint
    ) {
      this.mDeviceMemory = deviceMemory;
      this.mImage = image;
      this.mGraphicsCompiler = graphicsCompiler;
      this.mGraphicsPipeline = graphicsPipeline;
      this.mSampler = sampler;
      this.mDescriptorPool = descriptorPool;
      this.mDescriptorSet = descriptorSet;
      this.mVertexArrays = vertexArrays;
      this.mImageFormat = imageFormat;
      this.mSemaphores = semaphores;
      this.mFences = fences;
      this.mBuffers = buffers;
    }

    get buffers(): IWGLBufferEntrypoint {
      return this.mBuffers;
    }

    get fences(): IWGLFenceEntrypoint {
      return this.mFences;
    }

    get semaphores(): IWGLSemaphoreEntrypoint {
      return this.mSemaphores;
    }

    get imageFormat(): IWGLImageFormatEntrypoint {
      return this.mImageFormat;
    }

    get vertexArrays() : IWGLCmdVertexArrayEntrypoint {
      return this.mVertexArrays;
    }

    get deviceMemory() : IWGLDeviceMemoryEntrypoint {
      return this.mDeviceMemory;
    }
    
    get image(): IWGLDeviceImageEntrypoint {
      return this.mImage;
    }

    get graphicsCompiler(): IWGLGraphicsPipelineCompiler {
      return this.mGraphicsCompiler;      
    }

    get graphicsPipeline(): IWGLGraphicsPipelineEntrypoint {
      return this.mGraphicsPipeline;
    }

    get sampler(): IWGLSamplerEntrypoint {
      return this.mSampler;
    }

    get descriptorPool(): IWGLDescriptorPoolEntrypoint {
      return this.mDescriptorPool;
    }

    get descriptorSet(): IWGLDescriptorSetEntrypoint {
      return this.mDescriptorSet;
    }
  }
}