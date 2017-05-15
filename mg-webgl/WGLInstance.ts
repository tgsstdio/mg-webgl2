/// <reference path="../mg/IMgInstance.ts" />
/// <reference path="WGLPhysicalDevice.ts" />

namespace Magnesium {
  export class WGLInstance implements IMgInstance {
    private mDevice: IWGLDevice;

    constructor(device: IWGLDevice) {
      this.mDevice = device;
    }

    destroyInstance(allocator: IMgAllocationCallbacks) : void {

    }

		enumeratePhysicalDevices(out : { physicalDevices: Array<IMgPhysicalDevice>} ): MgResult {      
      let devices = new Array<IMgPhysicalDevice>(1);
      devices[0] = new WGLPhysicalDevice(this.mDevice);
      out.physicalDevices = devices;
      return MgResult.SUCCESS;
    }
  }
}