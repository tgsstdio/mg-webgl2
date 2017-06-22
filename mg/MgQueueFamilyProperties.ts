/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgQueueFamilyProperties {
    queueFlags: MgQueueFlagBits;
    queueCount: number;
    timestampValidBits: number;
    minImageTransferGranularity: MgExtent3D;
  }
}