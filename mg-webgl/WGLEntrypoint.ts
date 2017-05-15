/// <reference path="../mg/IMgEntrypoint.ts" />
/// <reference path="WGLInstance.ts" />

namespace Magnesium {
  export class WGLEntrypoint implements IMgEntrypoint {
    private mGL: object;

    constructor(gl : object) {
      this.mGL = gl;
    }

    createInstance(createInfo : MgInstanceCreateInfo
      , allocator: IMgAllocationCallbacks
      , out: { instance?: IMgInstance }) : MgResult
    {
      out.instance = new WGLInstance(this.mGL);
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

