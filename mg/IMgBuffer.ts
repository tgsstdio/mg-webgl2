import {MgResult} from './MgResult';
import {IMgDevice} from './IMgDevice'
import {IMgDeviceMemory} from './IMgDeviceMemory'
import {IMgAllocationCallbacks} from './IMgAllocationCallbacks'

export interface IMgBuffer {
  destroyBuffer(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;

  // WARN: memoryOffset requires UInt64
  bindBufferMemory(device: IMgDevice
    , memory: IMgDeviceMemory
    , memoryOffset: number) : MgResult;
}
