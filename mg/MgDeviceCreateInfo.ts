/// <reference path="MgDeviceQueueCreateInfo.ts" />
/// <reference path="MgPhysicalDeviceFeatures.ts" />

namespace Magnesium {
  export class MgDeviceCreateInfo {
    flags: number;
    queueCreateInfos: Array<MgDeviceQueueCreateInfo>;
    enabledLayerNames: Array<string>;
    enabledExtensionNames: Array<string>;
    enabledFeatures: MgPhysicalDeviceFeatures;
  }
}