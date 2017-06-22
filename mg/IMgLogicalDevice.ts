/// <reference path="Magnesium.ts" />

namespace Magnesium {
	export interface IMgLogicalDevice extends IMgDisposable	{
		readonly gpu: IMgPhysicalDevice;
    readonly device: IMgDevice;
    readonly queues: Array<IMgQueueInfo>;
	}
}