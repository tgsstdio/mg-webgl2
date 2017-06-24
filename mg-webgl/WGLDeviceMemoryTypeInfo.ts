import {MgMemoryPropertyFlagBits} from '../mg/MgMemoryPropertyFlagBits';

export class WGLDeviceMemoryTypeInfo {
  index: number;
  memoryTypeIndex: number;
  propertyFlags: MgMemoryPropertyFlagBits;
  isHosted: boolean;
  hint: number;
}
