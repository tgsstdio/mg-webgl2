/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgSurfaceCapabilitiesKHR {
    minImageCount: number;
    maxImageCount: number;
    currentExtent: MgExtent2D;
    minImageExtent: MgExtent2D;
    maxImageExtent: MgExtent2D;
    maxImageArrayLayers: number;
    supportedTransforms: MgSurfaceTransformFlagBitsKHR;
    currentTransform: MgSurfaceTransformFlagBitsKHR;
    supportedCompositeAlpha: MgCompositeAlphaFlagBitsKHR;
    supportedUsageFlags: MgImageUsageFlagBits;
  }
}