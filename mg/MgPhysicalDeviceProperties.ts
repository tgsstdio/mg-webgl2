/// <reference path="MgPhysicalDeviceType.ts" />
/// <reference path="MgPhysicalDeviceLimits.ts" />
/// <reference path="MgPhysicalDeviceSparseProperties.ts" />

namespace Magnesium {
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
}