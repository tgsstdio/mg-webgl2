import {IMgDevice}
	from './IMgDevice';	
import {MgResult}
	from './MgResult';     
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';	 
import {MgCommandPoolResetFlagBits}
	from './MgCommandPoolResetFlagBits';	

export interface IMgCommandPool	{
  destroyCommandPool(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;

  resetCommandPool(device: IMgDevice
  , flags: MgCommandPoolResetFlagBits) : MgResult;
}
