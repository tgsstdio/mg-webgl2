/// <reference path="../mg/IMgPhysicalDevice.ts" />
/// <reference path="../mg/MgDisplayPropertiesKHR.ts" />
/// <reference path="../mg/MgMemoryPropertyFlagBits.ts" />
/// <reference path="IWGLDevice.ts" />

namespace Magnesium {
  export class WGLPhysicalDevice implements IMgPhysicalDevice {
    private readonly mDevice : IWGLDevice;
    private readonly mDeviceMemoryMap: IWGLDeviceMemoryTypeMap;
    constructor(
      device: IWGLDevice
      , deviceMemoryMap: IWGLDeviceMemoryTypeMap
    ) {
      this.mDevice = device;
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
			out.pMemoryProperties = new MgPhysicalDeviceMemoryProperties();

      let count = this.mDeviceMemoryMap.memoryTypes.length;
      let slots = new Array<MgMemoryType>(count);
      for(let entry of this.mDeviceMemoryMap.memoryTypes) {
        // THE NUMBER OF SLOTS DETERMINE THE DIFFERENT BUFFER TYPES = no of GLMemoryBufferType enums
        let item = new MgMemoryType();
        item.heapIndex = 0;
        item.propertyFlags = entry.propertyFlags;
      }

      out.pMemoryProperties.memoryTypes = slots;
    }

		getPhysicalDeviceFeatures(
      out: { pFeatures: MgPhysicalDeviceFeatures|null }
    ) : void {
      let features = new MgPhysicalDeviceFeatures();
      features.multiViewport = false;      
      features.wideLines = false;
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
}