/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgMemoryAllocateInfo {
    // WARN: should be UInt64 
    allocationSize : number;
    memoryTypeIndex : number;
  }
}