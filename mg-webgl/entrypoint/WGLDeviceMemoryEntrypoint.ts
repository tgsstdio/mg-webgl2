import {MgMemoryAllocateInfo}
	from '../../mg/MgMemoryAllocateInfo';  
import {IWGLDeviceMemoryEntrypoint}
	from './IWGLDeviceMemoryEntrypoint';	  
import {IWGLDeviceMemoryTypeMap}
	from '../IWGLDeviceMemoryTypeMap';
import {IWGLDeviceMemory}
	from '../IWGLDeviceMemory';
import {WGLDeviceMemory}
	from '../WGLDeviceMemory';  	  	
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';

export class WGLDeviceMemoryEntrypoint implements IWGLDeviceMemoryEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  private mDeviceMemoryMap: IWGLDeviceMemoryTypeMap;
  constructor(
    glContext: IWGLBackbufferContext
    , deviceMemoryMap: IWGLDeviceMemoryTypeMap
  ) {
    this.mGLContext = glContext;
    this.mDeviceMemoryMap = deviceMemoryMap;
  }

  createDeviceMemory(createInfo: MgMemoryAllocateInfo) : IWGLDeviceMemory {
    return new WGLDeviceMemory(
      this.mGLContext.gl
      , createInfo
      , this.mDeviceMemoryMap
    );
  }
}
