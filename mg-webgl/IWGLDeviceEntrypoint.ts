/// <reference path="IWGLDeviceMemoryEntrypoint.ts" />
/// <reference path="IWGLDeviceImageEntrypoint.ts" />
/// <reference path="IWGLGraphicsPipelineCompiler.ts" />

namespace Magnesium {
  export interface IWGLDeviceEntrypoint {
    readonly deviceMemory : IWGLDeviceMemoryEntrypoint;
    readonly image: IWGLDeviceImageEntrypoint;
    readonly graphicsCompiler: IWGLGraphicsPipelineCompiler;
    readonly graphicsPipeline: IWGLGraphicsPipelineEntrypoint;
    readonly sampler: IWGLSamplerEntrypoint;
    readonly descriptorPool: IWGLDescriptorSetEntrypoint;
  }
}