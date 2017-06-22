import {MgAccessFlagBits} from './MgAccessFlagBits'

export class MgMemoryBarrier {
  srcAccessMask: MgAccessFlagBits;
  dstAccessMask: MgAccessFlagBits;
}
