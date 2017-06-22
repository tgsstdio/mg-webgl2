/// <reference path="Magnesium.ts" />

export class MgBufferMemoryBarrier {
  srcAccessMask: MgAccessFlagBits;
  dstAccessMask: MgAccessFlagBits;
  srcQueueFamilyIndex: number;
  dstQueueFamilyIndex: number;
  buffer: IMgBuffer;
  // WARN: offset requires UInt64
  offset: number;
  // WARN: size requires UInt64
  size: number;
}
