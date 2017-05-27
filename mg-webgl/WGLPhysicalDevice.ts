/// <reference path="../mg/IMgPhysicalDevice.ts" />
/// <reference path="../mg/MgDisplayPropertiesKHR.ts" />
/// <reference path="../mg/MgMemoryPropertyFlagBits.ts" />
/// <reference path="IWGLDevice.ts" />

namespace Magnesium {
  export class WGLPhysicalDevice implements IMgPhysicalDevice {
    private readonly mDevice : IWGLDevice;
    constructor(device: IWGLDevice) {
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
      out: { pMemoryProperties: MgPhysicalDeviceMemoryProperties }
    ) : void {
			// TODO : overwrite here to shift memory based on which type
			// 0 : buffer based 
			// 1 : host defined (for INDIRECT)
			out.pMemoryProperties = new MgPhysicalDeviceMemoryProperties();

      const MAX_SLOTS = 8;
			var slots = new Array<MgMemoryType>(MAX_SLOTS);

			const ALL_ON : number = (MgMemoryPropertyFlagBits.DEVICE_LOCAL_BIT |
			                       MgMemoryPropertyFlagBits.HOST_CACHED_BIT |
			                       MgMemoryPropertyFlagBits.HOST_COHERENT_BIT |
			                       MgMemoryPropertyFlagBits.LAZILY_ALLOCATED_BIT |
			                       MgMemoryPropertyFlagBits.HOST_VISIBLE_BIT);

			// THE NUMBER OF SLOTS DETERMINE THE DIFFERENT BUFFER TYPES = no of GLMemoryBufferType enums
      for (let i = 0; i < MAX_SLOTS; i += 1) {
        slots[i] = new MgMemoryType();
        slots[i].propertyFlags = ALL_ON;
      }

      out.pMemoryProperties.memoryTypes = slots;
    }

		getPhysicalDeviceFeatures(
      out: { pFeatures: MgPhysicalDeviceFeatures }
    ) : void {
      let features = new MgPhysicalDeviceFeatures();
      features.multiViewport = false;      
      features.wideLines = false;
      out.pFeatures = features;
    }

		getPhysicalDeviceFormatProperties(format: MgFormat
      , out: { pFormatProperties: MgFormatProperties }
    ) : never {
      throw new Error('Not implemented');
    }

		getPhysicalDeviceImageFormatProperties(format: MgFormat
      , type: MgImageType, tiling: MgImageTiling
      , usage: MgImageUsageFlagBits, flags: MgImageCreateFlagBits
      , out: { pImageFormatProperties: MgImageFormatProperties }
    ) : never  {
      throw new Error('Not implemented');
    }

    enumerateDeviceLayerProperties(
      out: { pProperties : Array<MgLayerProperties> }
    ) : never {
      throw new Error('Not implemented');
    }

		enumerateDeviceExtensionProperties(layerName: string
      , out: { pProperties: Array<MgExtensionProperties> }
    ) : MgResult {
        out.pProperties = new Array<MgExtensionProperties>(0);
        return MgResult.SUCCESS;
    }

		getPhysicalDeviceSparseImageFormatProperties(
      format: MgFormat
      , type: MgImageType, samples: MgSampleCountFlagBits
      , usage: MgImageUsageFlagBits,  tiling: MgImageTiling
      , out: { pProperties: Array<MgSparseImageFormatProperties> }
    ) : never {
      throw new Error('Not implemented');
    }

		getPhysicalDeviceDisplayPropertiesKHR(
      out: { pProperties: Array<MgDisplayPropertiesKHR> }
    ) : never {
      throw new Error('Not implemented');
    }

		getPhysicalDeviceDisplayPlanePropertiesKHR(
      out: { pProperties: Array<MgDisplayPlanePropertiesKHR> }
    ) : never {
      throw new Error('Not implemented');
    }

		getDisplayPlaneSupportedDisplaysKHR(planeIndex : number
      , out: { pDisplays: Array<IMgDisplayKHR> }
    ) : never {
      throw new Error('Not implemented');
    }

		getDisplayModePropertiesKHR(display: IMgDisplayKHR
      , out: {pProperties: Array<MgDisplayModePropertiesKHR>}
    ) : never {
      throw new Error('Not implemented');
    }

		createDisplayModeKHR(display: IMgDisplayKHR
      , pCreateInfo: MgDisplayModeCreateInfoKHR
      , allocator: IMgAllocationCallbacks|null
      , out: { pMode: IMgDisplayModeKHR}
    ) : never {
      throw new Error('Not implemented');
    }

		getDisplayPlaneCapabilitiesKHR(
      mode: IMgDisplayModeKHR
      , planeIndex: number
      , out: { pCapabilities : MgDisplayPlaneCapabilitiesKHR}
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
      , out: { pSurfaceCapabilities: MgSurfaceCapabilitiesKHR }
    ) : never {
      throw new Error('Not implemented');
    }

		getPhysicalDeviceSurfaceFormatsKHR(
      surface: IMgSurfaceKHR
      , out: {pSurfaceFormats: Array<MgSurfaceFormatKHR> }
    ) : never {
      throw new Error('Not implemented');
    }

		getPhysicalDeviceSurfacePresentModesKHR(
      surface: IMgSurfaceKHR
      , out: { pPresentModes: Array<MgPresentModeKHR> }
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