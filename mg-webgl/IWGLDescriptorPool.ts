
/// <reference path="IWGLDescriptorSet.ts" />

namespace Magnesium {
  export interface IWGLDescriptorPool extends IMgDescriptorPool {
    readonly maxSets: number;
    readonly allocatedSets: Map<number, IWGLDescriptorSet>;

    readonly combinedImageSamplers: IGLDescriptorPoolResource<WGLImageDescriptor>;
    readonly uniformBuffers: IGLDescriptorPoolResource<WGLBufferDescriptor>;
    readonly storageBuffers: IGLDescriptorPoolResource<WGLBufferDescriptor>;

		resetResource(resource: GLDescriptorPoolResourceInfo) : void;

		tryTake(out: {result: IWGLDescriptorSet|null } ) : boolean;
  }
}