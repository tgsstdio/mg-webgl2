import {IMgDeviceMemory} from '../mg/IMgDeviceMemory';

export interface IWGLDeviceMemory extends IMgDeviceMemory {
  readonly bufferSize: number;
  readonly isHostCached: boolean;
  readonly bufferId: WebGLBuffer|null;
  // // WARN: handle requires IntPtr
  readonly handle: ArrayBuffer| null;
}
