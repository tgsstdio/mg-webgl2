/// <reference path="../mg/IMgDeviceMemory.ts" />

namespace Magnesium {
  export interface IWGLDeviceMemory extends IMgDeviceMemory {
    readonly bufferSize: number;
    readonly isHostCached: boolean;
    readonly bufferId: WebGLBuffer|null;
    // // WARN: handle requires IntPtr
    readonly handle: ArrayBuffer| null;
  }
}