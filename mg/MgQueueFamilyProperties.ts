/// <reference path="MgExtent3D.ts" />
/// <reference path="MgQueueFlagBits.ts" />

namespace Magnesium {
  export class MgQueueFamilyProperties {
    queueFlags: MgQueueFlagBits;
    queueCount: number;
    timestampValidBits: number;
    minImageTransferGranularity: MgExtent3D;
  }
}