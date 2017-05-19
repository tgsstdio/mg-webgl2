/// <reference path="IGLDeviceMemoryEntrypoint.ts" />

namespace Magnesium {
  export interface IWGLDeviceEntrypoint {
    readonly deviceMemory : IWGLDeviceMemoryEntrypoint;
    readonly image: IWGLDeviceImageEntrypoint;
  }
}