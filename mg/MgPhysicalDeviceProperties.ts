import {MgPhysicalDeviceType} from './MgPhysicalDeviceType'
import {MgPhysicalDeviceLimits} from './MgPhysicalDeviceLimits'
import {MgPhysicalDeviceSparseProperties} from './MgPhysicalDeviceSparseProperties'

export class MgPhysicalDeviceProperties {
  apiVersion: number;
  driverVersion: number;
  vendorID: number;
  deviceID: number;
  deviceType: MgPhysicalDeviceType;
  deviceName: string;
  // WARN: pipelineCacheUUID requires guid
  pipelineCacheUUID: string;
  limits: MgPhysicalDeviceLimits;
  sparseProperties: MgPhysicalDeviceSparseProperties;
}