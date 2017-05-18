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

      let out_0 :{ pCommandPool: IMgCommandPool};
			var errCode = this.mDevice.createCommandPool (cmdPoolCreateInfo, null, out_0);
			if (errCode != MgResult.SUCCESS) {
        throw new Error('createPartition - command pool error')
      }

			let prop : { pMemoryProperties: MgPhysicalDeviceMemoryProperties};
			this.mParent.getPhysicalDeviceMemoryProperties (prop);

			var result = new MgThreadPartition (
        this.mParent
        , this.mDevice
        , this.mQueue
        , out_0.pCommandPool
        , prop.pMemoryProperties);

			return result;
		}
	}
}