import {IMgInstance}
from '../mg/IMgInstance';  
import {IMgPhysicalDevice}
from '../mg/IMgPhysicalDevice';   
import {WGLPhysicalDevice}
from './WGLPhysicalDevice';	  
import {IWGLDevice}
from './IWGLDevice';
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';
import {MgResult}
	from '../mg/MgResult';	  	

export class WGLInstance implements IMgInstance {
  private mDevice: IWGLDevice;
  private mPhysicalDevice: IMgPhysicalDevice;
  constructor(
    device: IWGLDevice
    , physicalDevice: IMgPhysicalDevice
  ) {
    this.mDevice = device;
    this.mPhysicalDevice = physicalDevice;
  }

  destroyInstance(allocator: IMgAllocationCallbacks|null) : void {

  }

  enumeratePhysicalDevices(out : { physicalDevices: Array<IMgPhysicalDevice>} ): MgResult {      
    let devices = new Array<IMgPhysicalDevice>(1);
    devices[0] = this.mPhysicalDevice;
    out.physicalDevices = devices;
    return MgResult.SUCCESS;
  }
}
