/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgSwapchainCreateInfoKHR {
    flags: number;
    surface: IMgSurfaceKHR;
    minImageCount: number;
    imageFormat: MgFormat;
    imageColorSpace: MgColorSpaceKHR;
    imageExtent: MgExtent2D;
    imageArrayLayers: number;
    imageUsage: MgImageUsageFlagBits;
    imageSharingMode: MgSharingMode;
    queueFamilyIndices: Array<number>;
    preTransform: MgSurfaceTransformFlagBitsKHR;
    compositeAlpha: MgCompositeAlphaFlagBitsKHR;
    presentMode: MgPresentModeKHR;
    clipped: boolean;
    oldSwapchain: IMgSwapchainKHR;
  }
}