import {IMgEntrypoint}
	from '../mg/IMgEntrypoint';  
import {IMgPhysicalDevice}
	from '../mg/IMgPhysicalDevice';   
import {IWGLDevice}
	from './IWGLDevice';	  
import {WGLInstance}
	from './WGLInstance';
import {MgInstanceCreateInfo}
	from '../mg/MgInstanceCreateInfo';  
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';
import {IMgInstance}
	from '../mg/IMgInstance';  
import {MgLayerProperties}
	from '../mg/MgLayerProperties';     
import {MgResult}
	from '../mg/MgResult';
import {MgExtensionProperties}
	from '../mg/MgExtensionProperties';    	  

export class WGLEntrypoint implements IMgEntrypoint {
  private mDevice: IWGLDevice;
  private mPhysicalDevice: IMgPhysicalDevice;
  constructor(
    device : IWGLDevice
    , physicalDevice: IMgPhysicalDevice
  ) {
    this.mDevice = device;
    this.mPhysicalDevice = physicalDevice;
  }

  createInstance(createInfo : MgInstanceCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { instance: IMgInstance|null }) : MgResult
  {
    out.instance = new WGLInstance(this.mDevice, this.mPhysicalDevice);
    return MgResult.SUCCESS;
  }

  enumerateInstanceLayerProperties(out: {properties?: Array<MgLayerProperties> } ) : MgResult {
      out.properties = new Array<MgLayerProperties>(0);
      return MgResult.SUCCESS;
  }

  enumerateInstanceExtensionProperties(layerName : string, out: { pProperties: Array<MgExtensionProperties>} ) : MgResult {
    out.pProperties = new Array<MgExtensionProperties>(0);
    return MgResult.SUCCESS;
  }
}

