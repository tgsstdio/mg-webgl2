/// <reference path="MgFormat.ts" />
/// <reference path="MgPresentModeKHR.ts" />
/// <reference path="MgSurfaceTransformFlagBitsKHR.ts" />
/// <reference path="MgImageUsageFlagBits.ts" />
/// <reference path="MgCompositeAlphaFlagBitsKHR.ts" />
/// <reference path="MgSharingMode.ts" />
/// <reference path="MgColorSpaceKHR.ts" />
/// <reference path="MgExtent2D.ts" />
/// <reference path="IMgSurfaceKHR.ts" />
/// <reference path="IMgSwapchainKHR.ts" />

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