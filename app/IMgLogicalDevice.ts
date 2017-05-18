/// <reference path="../mg/MgCommandPoolCreateFlagBits.ts" />
/// <reference path="../mg/IMgDevice.ts" />
/// <reference path="../mg/IMgQueue.ts" />
/// <reference path="../mg/IMgPhysicalDevice.ts" />

/// <reference path="IMgDisposable.ts" />

namespace Magnesium {
	export interface IMgLogicalDevice extends IMgDisposable	{
		readonly gpu: IMgPhysicalDevice;
    readonly device: IMgDevice;
    readonly queues: Array<IMgQueueInfo>;
	}
}