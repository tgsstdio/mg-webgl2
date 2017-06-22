/// <reference path="Magnesium.ts" />

export interface IMgEvent {
	getEventStatus(device: IMgDevice) : MgResult;
	setEvent(device: IMgDevice) : MgResult;
	resetEvent(device: IMgDevice) : MgResult;

	destroyEvent(device: IMgDevice
		, allocator: IMgAllocationCallbacks) : void;    
}
