import {MgExtent2D}
	from './MgExtent2D';	  
import {MgSurfaceTransformFlagBitsKHR}
	from './MgSurfaceTransformFlagBitsKHR';
import {MgCompositeAlphaFlagBitsKHR}
	from './MgCompositeAlphaFlagBitsKHR';	
import {MgImageUsageFlagBits}
	from './MgImageUsageFlagBits';	

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
