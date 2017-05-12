/// <reference path="IMgAllocationCallbacks.ts" />
/// <reference path="MgDeviceCreateInfo.ts" />
/// <reference path="MgResult.ts" />
/// <reference path="IMgDevice.ts" />
/// <reference path="MgPhysicalDeviceProperties.ts" />
/// <reference path="MgQueueFamilyProperties.ts" />
/// <reference path="MgPhysicalDeviceMemoryProperties.ts" />
/// <reference path="MgFormatProperties.ts" />
/// <reference path="MgImageFormatProperties.ts" />

namespace Magnesium {
  export interface IMgPhysicalDevice {
		createDevice(
      pCreateInfo : MgDeviceCreateInfo,
      allocator : IMgAllocationCallbacks,
      out : { pDevice : IMgDevice} ) : MgResult;

		getPhysicalDeviceProperties(
      out : { pProperties: MgPhysicalDeviceProperties }
      ) : void;
		getPhysicalDeviceQueueFamilyProperties(
      out: { pQueueFamilyProperties: Array<MgQueueFamilyProperties> }
      ) : void;
		getPhysicalDeviceMemoryProperties(
      out: { pMemoryProperties: MgPhysicalDeviceMemoryProperties }
      ) : void;
		getPhysicalDeviceFeatures(
      out: { pFeatures: MgPhysicalDeviceFeatures }
      ) : void;
		getPhysicalDeviceFormatProperties(format: MgFormat
      , out: { pFormatProperties: MgFormatProperties }
      ) : void;
		getPhysicalDeviceImageFormatProperties(format: MgFormat
      , type: MgImageType, tiling: MgImageTiling
      , usage: MgImageUsageFlagBits, flags: MgImageCreateFlagBits
      , out: { pImageFormatProperties: MgImageFormatProperties }) : MgResult;		
    enumerateDeviceLayerProperties(
      out: { pProperties : Array<MgLayerProperties> }
      ) : MgResult;
		enumerateDeviceExtensionProperties(layerName: string
      , out: { pProperties: Array<MgExtensionProperties> }
      ) : MgResult;
		getPhysicalDeviceSparseImageFormatProperties(
      format: MgFormat
      , type: MgImageType, samples: MgSampleCountFlagBits
      , usage: MgImageUsageFlagBits,  tiling: MgImageTiling
      , out: { pProperties: Array<MgSparseImageFormatProperties> }
      ) : void;
		getPhysicalDeviceDisplayPropertiesKHR(
      out: { pProperties: Array<MgDisplayPropertiesKHR> }
      ) : MgResult;
		getPhysicalDeviceDisplayPlanePropertiesKHR(
      out: { pProperties: Array<MgDisplayPlanePropertiesKHR> }
      ) : MgResult;
		getDisplayPlaneSupportedDisplaysKHR(planeIndex : number
      , out: { pDisplays: Array<IMgDisplayKHR> }
      ) : MgResult;
		getDisplayModePropertiesKHR(display: IMgDisplayKHR
      , out: {pProperties: Array<MgDisplayModePropertiesKHR>}
      ) : MgResult;
		createDisplayModeKHR(display: IMgDisplayKHR
      , pCreateInfo: MgDisplayModeCreateInfoKHR
      , allocator: IMgAllocationCallbacks
      , out: { pMode: IMgDisplayModeKHR}) : MgResult;
		getDisplayPlaneCapabilitiesKHR(
      mode: IMgDisplayModeKHR
      , planeIndex: number
      , out: { pCapabilities : MgDisplayPlaneCapabilitiesKHR}) : MgResult;
		getPhysicalDeviceSurfaceSupportKHR(
      queueFamilyIndex: number
      , surface: IMgSurfaceKHR
      , ref: { pSupported: boolean}) : MgResult;
		getPhysicalDeviceSurfaceCapabilitiesKHR(
      surface : IMgSurfaceKHR
      , out: { pSurfaceCapabilities: MgSurfaceCapabilitiesKHR }
      ) : MgResult;
		getPhysicalDeviceSurfaceFormatsKHR(
      surface: IMgSurfaceKHR
      , out: {pSurfaceFormats: Array<MgSurfaceFormatKHR> }
      ) : MgResult;
		getPhysicalDeviceSurfacePresentModesKHR(
      surface: IMgSurfaceKHR
      , out: { pPresentModes: Array<MgPresentModeKHR> }
      ) : MgResult;
		getPhysicalDeviceWin32PresentationSupportKHR(
      queueFamilyIndex : number) : boolean;
  }
}