import {IMgDevice}
	from './IMgDevice';	  
import {MgResult}
	from './MgResult';	  
import {IMgAllocationCallbacks}
	from './IMgAllocationCallbacks';

export interface IMgEvent {
	getEventStatus(device: IMgDevice) : MgResult;
	setEvent(device: IMgDevice) : MgResult;
	resetEvent(device: IMgDevice) : MgResult;

	destroyEvent(device: IMgDevice
		, allocator: IMgAllocationCallbacks) : void;    
}
