/// <reference path="../mg/IMgPhysicalDevice.ts" />
/// <reference path="../mg/IMgDevice.ts" />
/// <reference path="../mg/IMgQueue.ts" />
/// <reference path="../mg/IMgCommandPool.ts" />
/// <reference path="../mg/MgPhysicalDeviceMemoryProperties.ts" />
/// <reference path="IMgThreadPartition.ts" />

namespace Magnesium {
  export class MgThreadPartition implements IMgThreadPartition {    
    private mPhysicalDevice: IMgPhysicalDevice;
    private mDevice: IMgDevice;
    private mQueue: IMgQueue;
    private mCommandPool: IMgCommandPool;
    private mDeviceMemoryProperties: MgPhysicalDeviceMemoryProperties;
    
    constructor(
      physicalDevice : IMgPhysicalDevice
      , device: IMgDevice
      , queue: IMgQueue
      , commandPool: IMgCommandPool
      , deviceMemoryProperties: MgPhysicalDeviceMemoryProperties
    ) {
      this.mPhysicalDevice = physicalDevice;
      this.mDevice = device;
      this.mQueue = queue;
      this.mCommandPool = commandPool;
      this.mDeviceMemoryProperties = deviceMemoryProperties;
    }

    private mIsDisposed: boolean = false;
    dispose() : void {
      if (!this.mIsDisposed) {
        if (this.mDevice != null) {
          if (this.mCommandPool != null) {
            this.mCommandPool.destroyCommandPool(this.mDevice, null);
          }
        }
      }
    }

		getMemoryType(
      typeBits: number
      , memoryPropertyFlags: MgMemoryPropertyFlagBits
      , out: { typeIndex: number }
    ) : boolean
		{
			let requirements = memoryPropertyFlags;

			// Search memtypes to find first index with those properties
			for (let i = 0; i < this.mDeviceMemoryProperties.memoryTypes.length; i += 1)
			{
				if ((typeBits & 1) == 1) {
					// Type is available, does it match user properties?
					if ((this.mDeviceMemoryProperties.memoryTypes[i].propertyFlags 
                & requirements) == requirements) {
						out.typeIndex = i;
						return true;
					}
				}
				typeBits >>= 1;
			}
			// No memory types matched, return failure
			out.typeIndex = 0;
			return false;
		}

    get commandPool(): IMgCommandPool {
      return this.mCommandPool;
    }

    get queue(): IMgQueue {
      return this.mQueue;
    }

    get device(): IMgDevice {
      return this.mDevice;
    }

    get physicalDevice(): IMgPhysicalDevice {
      return this.mPhysicalDevice;
    }
  }
}