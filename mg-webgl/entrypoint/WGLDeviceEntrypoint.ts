import {IWGLDeviceEntrypoint}
	from './IWGLDeviceEntrypoint';	  
import {IWGLDeviceMemoryEntrypoint}
	from './IWGLDeviceMemoryEntrypoint';
import {IWGLDeviceImageEntrypoint}
	from './IWGLDeviceImageEntrypoint';	  
import {IWGLGraphicsPipelineCompilerEntrypoint}
	from './IWGLGraphicsPipelineCompilerEntrypoint';	 
import {IWGLGraphicsPipelineEntrypoint}
	from './IWGLGraphicsPipelineEntrypoint';	  
import {IWGLSamplerEntrypoint}
	from './IWGLSamplerEntrypoint';	 
import {IWGLDescriptorPoolEntrypoint}
	from './IWGLDescriptorPoolEntrypoint';	  
import {IWGLDescriptorSetEntrypoint}
	from './IWGLDescriptorSetEntrypoint';	 
import {IWGLCmdVertexArrayEntrypoint}
	from './IWGLCmdVertexArrayEntrypoint';	  
import {IWGLImageFormatEntrypoint}
	from './IWGLImageFormatEntrypoint';	 
import {IWGLSemaphoreEntrypoint}
	from './IWGLSemaphoreEntrypoint';	  
import {IWGLFenceEntrypoint}
	from './IWGLFenceEntrypoint';	 
import {IWGLBufferEntrypoint}
	from './IWGLBufferEntrypoint';	
           
export class WGLDeviceEntrypoint implements IWGLDeviceEntrypoint {
  private mDeviceMemory: IWGLDeviceMemoryEntrypoint;
  private mImage: IWGLDeviceImageEntrypoint;
  private mGraphicsCompiler: IWGLGraphicsPipelineCompilerEntrypoint;
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
    , graphicsCompiler: IWGLGraphicsPipelineCompilerEntrypoint
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

  get graphicsCompiler(): IWGLGraphicsPipelineCompilerEntrypoint {
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
