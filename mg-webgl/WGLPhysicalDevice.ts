import {MgResult} from '../mg/MgResult';
import {MgDeviceCreateInfo} from '../mg/MgDeviceCreateInfo';
import {IMgAllocationCallbacks} from '../mg/IMgAllocationCallbacks';
import {IMgDevice} from '../mg/IMgDevice';
import {MgPhysicalDeviceProperties} from '../mg/MgPhysicalDeviceProperties';
import {MgQueueFamilyProperties} from '../mg/MgQueueFamilyProperties';
import {MgPhysicalDeviceMemoryProperties}
  from '../mg/MgPhysicalDeviceMemoryProperties';
import {MgPhysicalDeviceFeatures} from '../mg/MgPhysicalDeviceFeatures';
import {MgFormat} from '../mg/MgFormat';
import {MgFormatProperties} from '../mg/MgFormatProperties';
import {MgImageTiling} from '../mg/MgImageTiling';
import {MgImageType} from '../mg/MgImageType';
import {MgImageUsageFlagBits} from '../mg/MgImageUsageFlagBits';
import {MgImageCreateFlagBits} from '../mg/MgImageCreateFlagBits';
import {MgImageFormatProperties} from '../mg/MgImageFormatProperties';
import {MgLayerProperties} from '../mg/MgLayerProperties';
import {MgExtensionProperties} from '../mg/MgExtensionProperties';
import {MgSampleCountFlagBits} from '../mg/MgSampleCountFlagBits';
import {MgSparseImageFormatProperties} from '../mg/MgSparseImageFormatProperties';
import {MgDisplayPropertiesKHR} from '../mg/MgDisplayPropertiesKHR';
import {MgDisplayPlanePropertiesKHR} from '../mg/MgDisplayPlanePropertiesKHR';
import {IMgDisplayKHR} from '../mg/IMgDisplayKHR';
import {MgDisplayModePropertiesKHR} from '../mg/MgDisplayModePropertiesKHR';
import {MgDisplayModeCreateInfoKHR} from '../mg/MgDisplayModeCreateInfoKHR';
import {IMgDisplayModeKHR} from '../mg/IMgDisplayModeKHR';
import {MgDisplayPlaneCapabilitiesKHR} from '../mg/MgDisplayPlaneCapabilitiesKHR';
import {IMgSurfaceKHR} from '../mg/IMgSurfaceKHR';
import {MgSurfaceCapabilitiesKHR} from '../mg/MgSurfaceCapabilitiesKHR';
import {MgSurfaceFormatKHR} from '../mg/MgSurfaceFormatKHR';
import {MgPresentModeKHR} from '../mg/MgPresentModeKHR';
import {MgMemoryPropertyFlagBits} from '../mg/MgMemoryPropertyFlagBits';
import {IWGLDevice} from './IWGLDevice';
import {IMgPhysicalDevice} from '../mg/IMgPhysicalDevice';
import {IWGLDeviceMemoryTypeMap} from './IWGLDeviceMemoryTypeMap';
import {MgPhysicalDeviceLimits} from '../mg/MgPhysicalDeviceLimits';
import {MgQueueFlagBits} from '../mg/MgQueueFlagBits';
import {MgMemoryType} from '../mg/MgMemoryType';
import {MgMemoryHeap} from '../mg/MgMemoryHeap';

export class WGLPhysicalDevice implements IMgPhysicalDevice {
  private readonly mDevice : IWGLDevice;
  private readonly mDeviceMemoryMap: IWGLDeviceMemoryTypeMap;
  constructor(
    device: IWGLDevice
    , deviceMemoryMap: IWGLDeviceMemoryTypeMap
  ) {
    this.mDevice = device;
    this.mDeviceMemoryMap = deviceMemoryMap;
  }  
  
  createDevice(
    pCreateInfo : MgDeviceCreateInfo
    , allocator : IMgAllocationCallbacks|null
    , out : { pDevice : IMgDevice}
  ) : MgResult {
      out.pDevice = this.mDevice;
      return MgResult.SUCCESS;
  }

  getPhysicalDeviceProperties(
    out : { pProperties: MgPhysicalDeviceProperties }
  ) : void {
    out.pProperties = new MgPhysicalDeviceProperties();
    let limits = new MgPhysicalDeviceLimits();
    limits.maxBoundDescriptorSets = 1;
    // WEBGL ONLY ALLOWS ONE VERTEX
    limits.maxVertexInputBindings = 1;      
    // MAX NO OF VIEWPORTS === MAX NO OF SCISSORS
    limits.maxViewports = 1;      
    limits.maxVertexInputBindingStride = 255;
    out.pProperties.limits = limits; 
  }

  getPhysicalDeviceQueueFamilyProperties(
    out: { pQueueFamilyProperties: Array<MgQueueFamilyProperties> }
  ) : void {
    out.pQueueFamilyProperties = new Array<MgQueueFamilyProperties>(1);
    let props = new MgQueueFamilyProperties();
    props.queueFlags = MgQueueFlagBits.GRAPHICS_BIT | MgQueueFlagBits.COMPUTE_BIT;
    out.pQueueFamilyProperties[0] = props;
  }

  getPhysicalDeviceMemoryProperties(
    out: { pMemoryProperties: MgPhysicalDeviceMemoryProperties|null }
  ) : void {
    let count = this.mDeviceMemoryMap.memoryTypes.length;
    let slots = new Array<MgMemoryType>(count);
    for(let i = 0; i < count; i += 1) {
      let entry = this.mDeviceMemoryMap.memoryTypes[i];
      // THE NUMBER OF SLOTS DETERMINE THE DIFFERENT BUFFER TYPES = no of GLMemoryBufferType enums
      let item = new MgMemoryType();
      item.heapIndex = 0;
      item.propertyFlags = entry.propertyFlags; 
      slots[i] = item;
    }

    out.pMemoryProperties = new MgPhysicalDeviceMemoryProperties();
    out.pMemoryProperties.memoryHeaps = new Array<MgMemoryHeap>(0);
    out.pMemoryProperties.memoryTypes = slots;
  }

  getPhysicalDeviceFeatures(
    out: { pFeatures: MgPhysicalDeviceFeatures|null }
  ) : void {
    let features = new MgPhysicalDeviceFeatures();
    features.multiViewport = false;      
    features.wideLines = false;
    features.logicOp = false;
    features.independentBlend = false;
    out.pFeatures = features;
  }

  getPhysicalDeviceFormatProperties(format: MgFormat
    , out: { pFormatProperties: MgFormatProperties|null }
  ) : never {
    throw new Error('Not implemented');
  }

  getPhysicalDeviceImageFormatProperties(format: MgFormat
    , type: MgImageType, tiling: MgImageTiling
    , usage: MgImageUsageFlagBits, flags: MgImageCreateFlagBits
    , out: { pImageFormatProperties: MgImageFormatProperties|null }
  ) : never  {
    throw new Error('Not implemented');
  }

  enumerateDeviceLayerProperties(
    out: { pProperties : Array<MgLayerProperties> }
  ) : never {
    throw new Error('Not implemented');
  }

  enumerateDeviceExtensionProperties(layerName: string
    , out: { pProperties: Array<MgExtensionProperties>|null }
  ) : MgResult {
      out.pProperties = new Array<MgExtensionProperties>(0);
      return MgResult.SUCCESS;
  }

  getPhysicalDeviceSparseImageFormatProperties(
    format: MgFormat
    , type: MgImageType, samples: MgSampleCountFlagBits
    , usage: MgImageUsageFlagBits,  tiling: MgImageTiling
    , out: { pProperties: Array<MgSparseImageFormatProperties>|null }
  ) : never {
    throw new Error('Not implemented');
  }

  getPhysicalDeviceDisplayPropertiesKHR(
    out: { pProperties: Array<MgDisplayPropertiesKHR>|null }
  ) : never {
    throw new Error('Not implemented');
  }

  getPhysicalDeviceDisplayPlanePropertiesKHR(
    out: { pProperties: Array<MgDisplayPlanePropertiesKHR>|null }
  ) : never {
    throw new Error('Not implemented');
  }

  getDisplayPlaneSupportedDisplaysKHR(planeIndex : number
    , out: { pDisplays: Array<IMgDisplayKHR>|null }
  ) : never {
    throw new Error('Not implemented');
  }

  getDisplayModePropertiesKHR(display: IMgDisplayKHR
    , out: {pProperties: Array<MgDisplayModePropertiesKHR>|null}
  ) : never {
    throw new Error('Not implemented');
  }

  createDisplayModeKHR(display: IMgDisplayKHR
    , pCreateInfo: MgDisplayModeCreateInfoKHR
    , allocator: IMgAllocationCallbacks|null
    , out: { pMode: IMgDisplayModeKHR|null}
  ) : never {
    throw new Error('Not implemented');
  }

  getDisplayPlaneCapabilitiesKHR(
    mode: IMgDisplayModeKHR
    , planeIndex: number
    , out: { pCapabilities : MgDisplayPlaneCapabilitiesKHR|null}
  ) : never {
    throw new Error('Not implemented');
  }

  getPhysicalDeviceSurfaceSupportKHR(
    queueFamilyIndex: number
    , surface: IMgSurfaceKHR
    , ref: { pSupported: boolean}
  ) : never {
    throw new Error('Not implemented');
  }

  getPhysicalDeviceSurfaceCapabilitiesKHR(
    surface : IMgSurfaceKHR
    , out: { pSurfaceCapabilities: MgSurfaceCapabilitiesKHR|null }
  ) : never {
    throw new Error('Not implemented');
  }

  getPhysicalDeviceSurfaceFormatsKHR(
    surface: IMgSurfaceKHR
    , out: {pSurfaceFormats: Array<MgSurfaceFormatKHR>|null }
  ) : never {
    throw new Error('Not implemented');
  }

  getPhysicalDeviceSurfacePresentModesKHR(
    surface: IMgSurfaceKHR
    , out: { pPresentModes: Array<MgPresentModeKHR>|null }
  ) : never {
    throw new Error('Not implemented');
  }

  getPhysicalDeviceWin32PresentationSupportKHR(
    queueFamilyIndex : number
  ) : never {
    throw new Error('Not implemented');
  }
}
