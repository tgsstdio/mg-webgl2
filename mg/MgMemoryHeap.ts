import {MgMemoryHeapFlagBits} from './MgMemoryHeapFlagBits'

export class MgMemoryHeap {
  // WARN: size requires UInt64
  size: number;
  flags: MgMemoryHeapFlagBits;
}
