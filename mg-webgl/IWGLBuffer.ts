/// <reference path="../mg/MgBufferUsageFlagBits.ts" />

namespace Magnesium { 
  export interface IWGLBuffer extends IMgBuffer {
    readonly hostMemory: ArrayBuffer|null;
    readonly deviceMemory: WebGLBuffer|null;
    readonly usage: MgBufferUsageFlagBits;
    readonly memoryType: WGLDeviceMemoryTypeFlagBits;
    readonly requestedSize: number;
    readonly isBufferType: boolean;
    readonly memoryOffset: number;
  }
}