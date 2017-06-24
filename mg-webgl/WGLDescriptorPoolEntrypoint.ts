import {MgDescriptorPoolCreateInfo}
	from '../mg/MgDescriptorPoolCreateInfo';  
import {IWGLDescriptorPoolEntrypoint}
	from './IWGLDescriptorPoolEntrypoint';	  
import {IWGLImageDescriptorEntrypoint}
	from './IWGLImageDescriptorEntrypoint';
import {IWGLDescriptorPool}
	from './IWGLDescriptorPool';
import {WGLDescriptorPool}
	from './WGLDescriptorPool';

export class WGLDescriptorPoolEntrypoint implements IWGLDescriptorPoolEntrypoint {
  private mEntrypoint: IWGLImageDescriptorEntrypoint;
  constructor(
    entrypoint: IWGLImageDescriptorEntrypoint
  ) {
    this.mEntrypoint = entrypoint;
  }
  
  createPool(
    createInfo: MgDescriptorPoolCreateInfo
  ) : IWGLDescriptorPool {
    return new WGLDescriptorPool(createInfo, this.mEntrypoint);
  }
}
