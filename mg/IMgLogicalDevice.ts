import {IMgDisposable} from './IMgDisposable'
import {IMgPhysicalDevice} from './IMgPhysicalDevice'
import {IMgDevice} from './IMgDevice'
import {IMgQueueInfo} from './IMgQueueInfo'

export interface IMgLogicalDevice extends IMgDisposable	{
	readonly gpu: IMgPhysicalDevice;
	readonly device: IMgDevice;
	readonly queues: Array<IMgQueueInfo>;
}
