import {IMgDevice}
	from './IMgDevice';	  
import {MgResult}
	from './MgResult';	  
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';
import {MgInstanceCreateInfo}
	from './MgInstanceCreateInfo';	
import {IMgInstance}
	from './IMgInstance';	    	
import {MgLayerProperties}
	from './MgLayerProperties';
import {MgExtensionProperties}
	from './MgExtensionProperties';	

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

