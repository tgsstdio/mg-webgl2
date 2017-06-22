import { MgMemoryType } from './MgMemoryType'
import { MgMemoryHeap } from './MgMemoryHeap'

export class MgPhysicalDeviceMemoryProperties {
  memoryTypes: Array<MgMemoryType>;
  memoryHeaps: Array<MgMemoryHeap>;
}
