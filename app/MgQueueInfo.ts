/// <reference path="IMgQueueInfo.ts" />
/// <reference path="MgThreadPartition.ts" />

namespace Magnesium {
	export class MgQueueInfo implements IMgQueueInfo {
    private mQueueFamilyIndex: number;
    get queueFamilyIndex() : number {
      return this.mQueueFamilyIndex;
    }

    private mQueueIndex: number;
    get queueIndex() : number {
      return this.mQueueIndex;
    } 

		private mParent: IMgPhysicalDevice;
    private mQueue: IMgQueue;
    private mDevice: IMgDevice;
		constructor (
      queueIndex: number
      , gpu: IMgPhysicalDevice
      , device: IMgDevice
      , queueFamilyIndex: number
      , queue: IMgQueue)
		{
			this.mQueueIndex = queueIndex;
			this.mQueueFamilyIndex = queueFamilyIndex;
			this.mParent = gpu;
			this.mDevice = device;
			this.mQueue = queue;
		}

		get queue() : IMgQueue {
			return this.mQueue;
		}		

		get device() : IMgDevice {
			return this.mDevice;
		}

		createPartition (flags: MgCommandPoolCreateFlagBits) : IMgThreadPartition
		{
			let cmdPoolCreateInfo = new MgCommandPoolCreateInfo();
			cmdPoolCreateInfo.queueFamilyIndex = this.mQueueFamilyIndex,
			cmdPoolCreateInfo.flags = flags;		

      let out_0 :{ pCommandPool: IMgCommandPool | null} = { pCommandPool: null };
			var errCode = this.mDevice.createCommandPool (cmdPoolCreateInfo, null, out_0);
			if (errCode != MgResult.SUCCESS) {
        throw new Error('createPartition - command pool error')
      }

			let prop : { pMemoryProperties: MgPhysicalDeviceMemoryProperties | null } = { pMemoryProperties: null };
			this.mParent.getPhysicalDeviceMemoryProperties (prop);

			let commandPool = out_0.pCommandPool as IMgCommandPool;
			let memoryProperties = prop.pMemoryProperties as MgPhysicalDeviceMemoryProperties;
			let result = new MgThreadPartition (
        this.mParent
        , this.mDevice
        , this.mQueue
        , commandPool
        , memoryProperties);

			return result;
		}
	}
}