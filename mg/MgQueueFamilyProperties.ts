import {MgQueueFlagBits} from './MgQueueFlagBits'
import {MgExtent3D} from './MgExtent3D'

export class MgQueueFamilyProperties {
  queueFlags: MgQueueFlagBits;
  queueCount: number;
  timestampValidBits: number;
  minImageTransferGranularity: MgExtent3D;
}
