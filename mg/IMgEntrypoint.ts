/// <reference path="MgResult.ts" />
/// <reference path="IMgInstance.ts" />
/// <reference path="MgInstanceCreateInfo.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />
/// <reference path="MgLayerProperties.ts" />

namespace Magnesium {
  export interface IMgEntrypoint {
    createInstance(createInfo : MgInstanceCreateInfo, allocator: IMgAllocationCallbacks|null, out: { instance: IMgInstance|null }) : MgResult;
		enumerateInstanceLayerProperties(out: {properties?: Array<MgLayerProperties> } ) : MgResult;
		enumerateInstanceExtensionProperties(layerName : string|null, out: { pProperties: Array<MgExtensionProperties> | null } ) : MgResult;    
  }
}
