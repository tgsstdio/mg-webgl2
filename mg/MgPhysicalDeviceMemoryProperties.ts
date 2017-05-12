/// <reference path="MgMemoryHeap.ts" />
/// <reference path="MgMemoryType.ts" />

namespace Magnesium {
  export class MgPhysicalDeviceMemoryProperties {
    memoryTypes: Array<MgMemoryType>;
    memoryHeaps: Array<MgMemoryHeap>;
  }
}