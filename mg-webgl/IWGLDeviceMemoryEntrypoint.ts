import {MgMemoryAllocateInfo}
	from '../mg/MgMemoryAllocateInfo';  
import {IWGLDeviceMemory}
	from './IWGLDeviceMemory';

export interface IWGLDeviceMemoryEntrypoint {
  createDeviceMemory(createInfo: MgMemoryAllocateInfo) : IWGLDeviceMemory;
}
