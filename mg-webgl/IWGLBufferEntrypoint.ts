/// <reference path="../mg/MgBufferCreateInfo.ts" />


namespace Magnesium {
  export interface IWGLBufferEntrypoint {
    createBuffer(createInfo: MgBufferCreateInfo): IWGLBuffer;
  }
}