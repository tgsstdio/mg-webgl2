/// <reference path="MgAccessFlagBits.ts" />

namespace Magnesium {
  export class MgMemoryBarrier {
    srcAccessMask: MgAccessFlagBits;
    dstAccessMask: MgAccessFlagBits;
  }
}