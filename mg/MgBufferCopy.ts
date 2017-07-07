export class MgBufferCopy {
  constructor() {
    this.srcOffset = 0;
    this.dstOffset = 0;
    this.size = 0;
  }

  // WARN: srcOffset requires UInt64
  srcOffset: number;
  // WARN: dstOffset requires UInt64
  dstOffset: number;
  // WARN: size requires UInt64
  size: number;
}
