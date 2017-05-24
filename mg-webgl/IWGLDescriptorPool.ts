
/// <reference path="IWGLDescriptorSet.ts" />

namespace Magnesium {
  export interface IWGLDescriptorPool extends IMgDescriptorPool {
    readonly maxSets: number;
    readonly allocatedSets: Map<number, IWGLDescriptorSet>;

    readonly combinedImageSamplers: IGLDescriptorPoolResource<GLImageDescriptor>;
    readonly uniformBuffers: IGLDescriptorPoolResource<GLBufferDescriptor>;
    readonly storageBuffers: IGLDescriptorPoolResource<GLBufferDescriptor>;

		resetResource(resource: GLDescriptorPoolResourceInfo) : void;

		tryTake(out: {result: IWGLDescriptorSet|null } ) : boolean;
  }
}