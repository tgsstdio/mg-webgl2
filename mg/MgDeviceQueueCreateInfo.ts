/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgDeviceQueueCreateInfo {
    flags : number;
    queueFamilyIndex : number;
    queueCount : number;
    queuePriorities : Array<number>;
  }
}