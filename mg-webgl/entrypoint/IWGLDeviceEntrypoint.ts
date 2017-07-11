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

export interface IWGLDeviceEntrypoint {
  readonly deviceMemory : IWGLDeviceMemoryEntrypoint;
  readonly image: IWGLDeviceImageEntrypoint;
  readonly graphicsCompiler: IWGLGraphicsPipelineCompilerEntrypoint;
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
