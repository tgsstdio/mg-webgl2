/// <reference path="../mg/IMgCommandPool.ts" />
/// <reference path="../mg/IMgDevice.ts" />
/// <reference path="../mg/IMgQueue.ts" />
/// <reference path="../mg/IMgPhysicalDevice.ts" />
/// <reference path="../mg/MgMemoryPropertyFlagBits.ts" />

namespace Magnesium {
  export interface IMgThreadPartition
      extends IMgDisposable {
        
    readonly commandPool: IMgCommandPool;
    readonly device: IMgDevice;
    readonly queue: IMgQueue;
    readonly physicalDevice: IMgPhysicalDevice;

    getMemoryType(
      typeBits: number
      , memoryPropertyFlags: MgMemoryPropertyFlagBits
      , out: { typeIndex: number}) : boolean;
  }
}