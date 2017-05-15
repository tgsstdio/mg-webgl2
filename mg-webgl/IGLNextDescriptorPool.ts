/// <reference path="IGLDescriptorPoolResource.ts" />
/// <reference path="GLImageDescriptor.ts" />
/// <reference path="GLBufferDescriptor.ts" />

namespace Magnesium {
	export interface IGLNextDescriptorPool extends IMgDescriptorPool {
    readonly maxSets: number;
    readonly allocatedSets: Map<number, IGLDescriptorSet>;
    readonly combinedImageSamplers: IGLDescriptorPoolResource<GLImageDescriptor>;
    readonly uniformBuffers: IGLDescriptorPoolResource<GLBufferDescriptor>;
    readonly storageBuffers: IGLDescriptorPoolResource<GLBufferDescriptor>;
  }
}



