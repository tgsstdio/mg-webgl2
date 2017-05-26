/// <reference path="../mg-webgl/IWGLSemaphoreEntrypoint.ts" />
/// <reference path="WGLSemaphore.ts" />

namespace Magnesium {
  export class WGLSemaphoreEntrypoint implements IWGLSemaphoreEntrypoint {
    createSemaphore() : IWGLSemaphore {
      return new WGLSemaphore();
    }
  }
}