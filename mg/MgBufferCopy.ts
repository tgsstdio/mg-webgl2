/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgBufferCopy {
    // WARN: srcOffset requires UInt64
    srcOffset: number;
    // WARN: dstOffset requires UInt64
    dstOffset: number;
    // WARN: size requires UInt64
    size: number;
  }
}