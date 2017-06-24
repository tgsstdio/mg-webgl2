import {IWGLDescriptorSet} from './IWGLDescriptorSet'
import {IMgDescriptorPool} from '../mg/IMgDescriptorPool';
import {IWGLDescriptorPoolResource} from './IWGLDescriptorPoolResource';
import {WGLImageDescriptor} from './WGLImageDescriptor';
import {WGLBufferDescriptor} from './WGLBufferDescriptor';
import {WGLDescriptorPoolResourceInfo} from './WGLDescriptorPoolResourceInfo';

export interface IWGLDescriptorPool extends IMgDescriptorPool {
  readonly maxSets: number;
  readonly allocatedSets: Map<number, IWGLDescriptorSet>;

  readonly combinedImageSamplers: IWGLDescriptorPoolResource<WGLImageDescriptor>;
  readonly uniformBuffers: IWGLDescriptorPoolResource<WGLBufferDescriptor>;
  readonly storageBuffers: IWGLDescriptorPoolResource<WGLBufferDescriptor>;

  resetResource(resource: WGLDescriptorPoolResourceInfo) : void;

  tryTake(out: {result: IWGLDescriptorSet|null } ) : boolean;
}
