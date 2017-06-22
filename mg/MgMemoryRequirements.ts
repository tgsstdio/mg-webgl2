/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgMemoryRequirements {
    // WARN: size requires ulong
    size: number;
    // WARN: alignment requires ulong
    alignment: number;
    memoryTypeBits: number;
  }
}