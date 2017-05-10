/// <reference path="MgResult.ts" />
/// <reference path="MgInstanceCreateInfo.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />

namespace Magnesium {
  export interface IMgEntrypoint {
    createInstance(createInfo : MgInstanceCreateInfo, allocator: IMgAllocationCallbacks, out: { instance?: IMgInstance }) : MgResult;
		enumerateInstanceLayerProperties(out: {properties?: Array<MgLayerProperties> } ) : MgResult;
		enumerateInstanceExtensionProperties(layerName : string, out: { pProperties: Array<MgExtensionProperties>} ) : MgResult;    
  }
}
