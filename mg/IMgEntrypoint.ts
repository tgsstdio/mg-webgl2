/// <reference path="Magnesium.ts" />

export interface IMgEntrypoint {
  createInstance(
    createInfo : MgInstanceCreateInfo
    , allocator: IMgAllocationCallbacks|null
    , out: { instance: IMgInstance|null }
  ) : MgResult;
  enumerateInstanceLayerProperties(
    out: {properties?: Array<MgLayerProperties> }
  ) : MgResult;
  enumerateInstanceExtensionProperties(
    layerName : string|null
    , out: { pProperties: Array<MgExtensionProperties> | null }
  ) : MgResult;    
}

