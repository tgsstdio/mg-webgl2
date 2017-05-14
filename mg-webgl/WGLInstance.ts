namespace Magnesium {
  export class WGLInstance implements IMgInstance {
    private mGL: object;

    constructor(gl) {
      this.mGL = gl;
    }

    destroyInstance(allocator: IMgAllocationCallbacks) : void {

    }

		enumeratePhysicalDevices(out : { physicalDevices: Array<IMgPhysicalDevice>} ): MgResult {      
      let devices = new Array<IMgPhysicalDevice>(1);
      devices[0] = new WGLPhysicalDevice(this.mGL);
      out.physicalDevices = devices;
      return MgResult.SUCCESS;
    }
  }
}