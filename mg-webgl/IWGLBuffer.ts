/// <reference path="../mg/MgBufferUsageFlagBits.ts" />

namespace Magnesium { 
  export interface IWGLBuffer extends IMgBuffer {
    readonly hosted: ArrayBuffer|null;
    readonly source: WebGLBuffer|null;
    readonly usage: MgBufferUsageFlagBits;
    readonly requestedSize: number;
    readonly isBufferType: boolean;
  }
}