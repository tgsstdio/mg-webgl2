/// <reference path="Magnesium.ts" />

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
