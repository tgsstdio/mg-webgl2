/// <reference path="../mg/IMgEntrypoint.ts" />
/// <reference path="WGLInstance.ts" />

namespace Magnesium {
  export class WGLEntrypoint implements IMgEntrypoint {
    private mDevice: IWGLDevice;

    constructor(device : IWGLDevice) {
      this.mDevice = device;
    }

    createInstance(createInfo : MgInstanceCreateInfo
      , allocator: IMgAllocationCallbacks|null
      , out: { instance: IMgInstance|null }) : MgResult
    {
      out.instance = new WGLInstance(this.mDevice);
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
}

