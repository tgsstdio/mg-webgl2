import {MgResult} from './MgResult';
import {MgDeviceCreateInfo} from './MgDeviceCreateInfo';
import {IMgAllocationCallbacks} from './IMgAllocationCallbacks';
import {IMgDevice} from './IMgDevice';
import {MgPhysicalDeviceProperties} from './MgPhysicalDeviceProperties';
import {MgQueueFamilyProperties} from './MgQueueFamilyProperties';
import {MgPhysicalDeviceMemoryProperties}
  from './MgPhysicalDeviceMemoryProperties';
import {MgPhysicalDeviceFeatures} from './MgPhysicalDeviceFeatures';
import {MgFormat} from './MgFormat';
import {MgFormatProperties} from './MgFormatProperties';
import {MgImageTiling} from './MgImageTiling';
import {MgImageType} from './MgImageType';
import {MgImageUsageFlagBits} from './MgImageUsageFlagBits';
import {MgImageCreateFlagBits} from './MgImageCreateFlagBits';
import {MgImageFormatProperties} from './MgImageFormatProperties';
import {MgLayerProperties} from './MgLayerProperties';
import {MgExtensionProperties} from './MgExtensionProperties';
import {MgSampleCountFlagBits} from './MgSampleCountFlagBits';
import {MgSparseImageFormatProperties} from './MgSparseImageFormatProperties';
import {MgDisplayPropertiesKHR} from './MgDisplayPropertiesKHR';
import {MgDisplayPlanePropertiesKHR} from './MgDisplayPlanePropertiesKHR';
import {IMgDisplayKHR} from './IMgDisplayKHR';
import {MgDisplayModePropertiesKHR} from './MgDisplayModePropertiesKHR';
import {MgDisplayModeCreateInfoKHR} from './MgDisplayModeCreateInfoKHR';
import {IMgDisplayModeKHR} from './IMgDisplayModeKHR';
import {MgDisplayPlaneCapabilitiesKHR} from './MgDisplayPlaneCapabilitiesKHR';
import {IMgSurfaceKHR} from './IMgSurfaceKHR';
import {MgSurfaceCapabilitiesKHR} from './MgSurfaceCapabilitiesKHR';
import {MgSurfaceFormatKHR} from './MgSurfaceFormatKHR';
import {MgPresentModeKHR} from './MgPresentModeKHR';

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
