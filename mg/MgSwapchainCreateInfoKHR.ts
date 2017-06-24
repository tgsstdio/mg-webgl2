import {IMgSurfaceKHR}
	from './IMgSurfaceKHR';	  
import {MgFormat}
	from './MgFormat';
import {MgColorSpaceKHR}
	from './MgColorSpaceKHR';	
import {MgExtent2D}
	from './MgExtent2D';	  
import {MgImageUsageFlagBits}
	from './MgImageUsageFlagBits';
import {MgSharingMode}
	from './MgSharingMode';	
import {MgSurfaceTransformFlagBitsKHR}
	from './MgSurfaceTransformFlagBitsKHR';	  
import {MgCompositeAlphaFlagBitsKHR}
	from './MgCompositeAlphaFlagBitsKHR';
import {MgPresentModeKHR}
	from './MgPresentModeKHR';	    
import {IMgSwapchainKHR}
	from './IMgSwapchainKHR';	

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
