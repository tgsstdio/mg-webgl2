/// <reference path="IMgAllocationCallbacks.ts" />
/// <reference path="MgDeviceCreateInfo.ts" />
/// <reference path="MgResult.ts" />
/// <reference path="IMgDevice.ts" />
/// <reference path="MgPhysicalDeviceProperties.ts" />
/// <reference path="MgQueueFamilyProperties.ts" />
/// <reference path="MgPhysicalDeviceMemoryProperties.ts" />
/// <reference path="MgFormatProperties.ts" />
/// <reference path="MgImageFormatProperties.ts" />
/// <reference path="MgLayerProperties.ts" />
/// <reference path="MgExtensionProperties.ts" />
/// <reference path="MgSparseImageFormatProperties.ts" />
/// <reference path="MgSurfaceFormatKHR.ts" />
/// <reference path="MgDisplayPlanePropertiesKHR.ts" />
/// <reference path="MgDisplayModeCreateInfoKHR.ts" />
/// <reference path="IMgDisplayModeKHR.ts" />
/// <reference path="MgSurfaceCapabilitiesKHR.ts" />
/// <reference path="MgDisplayModePropertiesKHR.ts" />
/// <reference path="MgDisplayPlaneCapabilitiesKHR.ts" />

namespace Magnesium {
  export interface IMgPhysicalDevice {
		createDevice(
      pCreateInfo : MgDeviceCreateInfo,
      allocator : IMgAllocationCallbacks | null,
      out : { pDevice : IMgDevice | null} ) : MgResult;

		getPhysicalDeviceProperties(
      out : { pProperties: MgPhysicalDeviceProperties | null }
      ) : void;
		getPhysicalDeviceQueueFamilyProperties(
      out: { pQueueFamilyProperties: Array<MgQueueFamilyProperties> | null }
      ) : void;
		getPhysicalDeviceMemoryProperties(
      out: { pMemoryProperties: MgPhysicalDeviceMemoryProperties | null }
      ) : void;
		getPhysicalDeviceFeatures(
      out: { pFeatures: MgPhysicalDeviceFeatures| null }
      ) : void;
		getPhysicalDeviceFormatProperties(format: MgFormat
      , out: { pFormatProperties: MgFormatProperties| null }
      ) : void;
		getPhysicalDeviceImageFormatProperties(format: MgFormat
      , type: MgImageType, tiling: MgImageTiling
      , usage: MgImageUsageFlagBits, flags: MgImageCreateFlagBits
      , out: { pImageFormatProperties: MgImageFormatProperties|null }) : MgResult;		
    enumerateDeviceLayerProperties(
      out: { pProperties : Array<MgLayerProperties> }
      ) : MgResult;
		enumerateDeviceExtensionProperties(layerName: string|null
      , out: { pProperties: Array<MgExtensionProperties> | null }
      ) : MgResult;
		getPhysicalDeviceSparseImageFormatProperties(
      format: MgFormat
      , type: MgImageType, samples: MgSampleCountFlagBits
      , usage: MgImageUsageFlagBits,  tiling: MgImageTiling
      , out: { pProperties: Array<MgSparseImageFormatProperties>|null }
      ) : void;
		getPhysicalDeviceDisplayPropertiesKHR(
      out: { pProperties: Array<MgDisplayPropertiesKHR>|null }
      ) : MgResult;
		getPhysicalDeviceDisplayPlanePropertiesKHR(
      out: { pProperties: Array<MgDisplayPlanePropertiesKHR>|null }
      ) : MgResult;
		getDisplayPlaneSupportedDisplaysKHR(planeIndex : number
      , out: { pDisplays: Array<IMgDisplayKHR>|null }
      ) : MgResult;
		getDisplayModePropertiesKHR(display: IMgDisplayKHR
      , out: {pProperties: Array<MgDisplayModePropertiesKHR>| null}
      ) : MgResult;
		createDisplayModeKHR(display: IMgDisplayKHR
      , pCreateInfo: MgDisplayModeCreateInfoKHR
      , allocator: IMgAllocationCallbacks|null
      , out: { pMode: IMgDisplayModeKHR|null}) : MgResult;
		getDisplayPlaneCapabilitiesKHR(
      mode: IMgDisplayModeKHR
      , planeIndex: number
      , out: { pCapabilities : MgDisplayPlaneCapabilitiesKHR| null}) : MgResult;
		getPhysicalDeviceSurfaceSupportKHR(
      queueFamilyIndex: number
      , surface: IMgSurfaceKHR
      , ref: { pSupported: boolean}) : MgResult;
		getPhysicalDeviceSurfaceCapabilitiesKHR(
      surface : IMgSurfaceKHR
      , out: { pSurfaceCapabilities: MgSurfaceCapabilitiesKHR|null }
      ) : MgResult;
		getPhysicalDeviceSurfaceFormatsKHR(
      surface: IMgSurfaceKHR
      , out: {pSurfaceFormats: Array<MgSurfaceFormatKHR>|null }
      ) : MgResult;
		getPhysicalDeviceSurfacePresentModesKHR(
      surface: IMgSurfaceKHR
      , out: { pPresentModes: Array<MgPresentModeKHR>|null }
      ) : MgResult;
		getPhysicalDeviceWin32PresentationSupportKHR(
      queueFamilyIndex : number) : boolean;
  }
}