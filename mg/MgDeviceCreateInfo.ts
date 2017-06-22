import {MgDeviceQueueCreateInfo} from './MgDeviceQueueCreateInfo'
import {MgPhysicalDeviceFeatures} from './MgPhysicalDeviceFeatures'

export class MgDeviceCreateInfo {
  flags: number;
  queueCreateInfos: Array<MgDeviceQueueCreateInfo>;
  enabledLayerNames: Array<string>;
  enabledExtensionNames: Array<string>;
  enabledFeatures: MgPhysicalDeviceFeatures;
}