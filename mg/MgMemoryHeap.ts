/// <reference path="MgMemoryHeapFlagBits.ts" />

namespace Magnesium {
  export class MgMemoryHeap {
    // WARN: size requires UInt64
    size: number;
    flags: MgMemoryHeapFlagBits;
  }
}