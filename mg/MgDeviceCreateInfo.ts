/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgDeviceCreateInfo {
    flags: number;
    queueCreateInfos: Array<MgDeviceQueueCreateInfo>;
    enabledLayerNames: Array<string>;
    enabledExtensionNames: Array<string>;
    enabledFeatures: MgPhysicalDeviceFeatures;
  }
}