/// <reference path="../mg/IMgPhysicalDevice.ts" />
/// <reference path="IMgLogicalDevice.ts" />

namespace Magnesium {
  export class MgLogicalDevice implements IMgLogicalDevice {  
    private mGPU: IMgPhysicalDevice;
    private mDevice: IMgDevice;
    private mQueues: Array<IMgQueueInfo>
    constructor(
      gpu: IMgPhysicalDevice
      , device: IMgDevice
      , queues: Array<IMgQueueInfo>
    ) {
      this.mGPU = gpu;
      this.mDevice = device;
      this.mQueues = queues;
    }

    private mIsDisposed: boolean = false;
    dispose(): void {
      if (!this.mIsDisposed) {
        this.mDevice.destroyDevice(null);
        this.mIsDisposed = true;
      }
    }

    get device(): IMgDevice {
      return this.mDevice;
    }

    get gpu(): IMgPhysicalDevice {
      return this.mGPU;
    }

    get queues(): Array<IMgQueueInfo> {
      return this.mQueues;
    }
  }
}