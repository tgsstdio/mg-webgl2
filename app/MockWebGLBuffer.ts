import {IMgDevice} from '../mg/IMgDevice';
import {MgResult} from '../mg/MgResult';
import {IMgDeviceMemory} from '../mg/IMgDeviceMemory';
import {IMgAllocationCallbacks} from '../mg/IMgAllocationCallbacks';
import {MgBufferUsageFlagBits} from '../mg/MgBufferUsageFlagBits';
import {WGLDeviceMemoryTypeFlagBits} from '../mg-webgl/WGLDeviceMemoryTypeFlagBits';
import {IWGLBuffer} from '../mg-webgl/IWGLBuffer';

export class MockWebGLBuffer implements IWGLBuffer {
  hostMemory: ArrayBuffer|null;
  deviceMemory: WebGLBuffer|null;
  usage: MgBufferUsageFlagBits;
  memoryType: WGLDeviceMemoryTypeFlagBits;
  requestedSize: number;
  isBufferType: boolean;
  memoryOffset: number;
  bestBufferTarget: number|null;

  destroyBuffer(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null
  ) : void {

  }

  // WARN: memoryOffset requires UInt64
  bindBufferMemory(device: IMgDevice
    , memory: IMgDeviceMemory
    , memoryOffset: number
  ) : MgResult {
    return MgResult.SUCCESS;
  }
}