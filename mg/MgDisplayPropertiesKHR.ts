/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgDisplayPropertiesKHR {
    display: IMgDisplayKHR;
    displayName: string;
    physicalDimensions: MgExtent2D;
    physicalResolution: MgExtent2D;
    supportedTransforms: MgSurfaceTransformFlagBitsKHR;
    planeReorderPossible: boolean;
    persistentContent: boolean;
  }
}