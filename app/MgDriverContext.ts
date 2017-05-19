/// <reference path="../mg/IMgEntrypoint.ts" />
/// <reference path="../mg/IMgInstance.ts" />
/// <reference path="../mg/MgResult.ts" />
/// <reference path="IMgDisposable.ts" />
/// <reference path="MgInstanceExtensionOptions.ts" />

namespace Magnesium {

  export class MgDriverContext implements IMgDisposable {
    private mEntrypoint : IMgEntrypoint;
    constructor(entrypoint : IMgEntrypoint) {
      this.mEntrypoint = entrypoint;
    }

    private mInstance : IMgInstance;
    initializeAll (
      appInfo: MgApplicationInfo
      , enabledLayerNames: Array<string> | null
      , enabledExtensionNames: Array<string> | null
    ) : MgResult {
			let createInfo = new MgInstanceCreateInfo();
      createInfo.applicationInfo = appInfo;
      createInfo.enabledLayerNames = enabledLayerNames as Array<string>;
			createInfo.enabledExtensionNames = enabledExtensionNames as Array<string>;
      let out : { instance : IMgInstance | null } = { instance: null };
			let result = this.mEntrypoint.createInstance (createInfo, null, out);
      this.mInstance = out.instance as IMgInstance;
      return result;
		}

    initialize(appInfo: MgApplicationInfo) : MgResult {
      return this.initializeAll (appInfo, null, null);
    }

    initializeWithExtensions(
      appInfo : MgApplicationInfo
      , options: MgInstanceExtensionOptions
    ) : MgResult {
      let extensions = new Array<string>();
      if (options == MgInstanceExtensionOptions.ALL) {
        let out : { pProperties : Array<MgExtensionProperties> | null } = { pProperties: null };
        let err = this.mEntrypoint.enumerateInstanceExtensionProperties(null, out);

        if (err != MgResult.SUCCESS) {
          return err;
        }

        let enabledExtensions = new Array<string>();
        let extensionProperties = out.pProperties as Array<MgExtensionProperties>;
        if (out.pProperties != null) {
          for (let ext of extensionProperties) {
            extensions.push(ext.extensionName);
          }
        }
      } else if (options == MgInstanceExtensionOptions.SWAPCHAIN_ONLY) {
        extensions.push("VK_KHR_swapchain");
      }
      return this.initializeAll(appInfo, null, extensions);
    }

    createLogicalDevice(
      presentationSurface: IMgSurfaceKHR | null
      , option: MgDeviceExtensionOptions
      , allocationUsage: MgQueueAllocation
      , deviceUsage: MgQueueFlagBits
    ) : IMgLogicalDevice {
      let out_0 : { physicalDevices: Array<IMgPhysicalDevice> | null } = { physicalDevices: null };
      let err_0 = this.mInstance.enumeratePhysicalDevices(out_0);

      if (err_0 != MgResult.SUCCESS) {
        throw new Error('createLogicalDevice: enumeratePhysicalDevices');
      }

      let first : IMgPhysicalDevice = (out_0.physicalDevices as Array<IMgPhysicalDevice>)[0];

      let enabledExtensions = new Array<string>(); 
      if (option == MgDeviceExtensionOptions.ALL) {
        let out_1: { pProperties: Array<MgExtensionProperties> | null } = { pProperties: null };
        let err_1 = first.enumerateDeviceExtensionProperties(
          null
          , out_1);
        
        if (err_1 != MgResult.SUCCESS) {
          throw new Error('createLogicalDevice: enumerateDeviceExtensionProperties');
        }

        let properties : Array<MgExtensionProperties> = out_1.pProperties as Array<MgExtensionProperties>;
        for (let ext of properties) {
          enabledExtensions.push(ext.extensionName);
        }        
      }

      let surface : IMgSurfaceKHR = presentationSurface as IMgSurfaceKHR;
      return this.createDeviceA(first, surface, allocationUsage, deviceUsage, enabledExtensions);
    }

    private createDeviceA(
      gpu: IMgPhysicalDevice
      , presentationSurface: IMgSurfaceKHR
      , requestCount: MgQueueAllocation
      , requestedQueueType: MgQueueFlagBits
      , enabledExtensions: Array<string>
    ): IMgLogicalDevice {

			// Find a queue that supports graphics operations
			let out : { pQueueFamilyProperties: Array<MgQueueFamilyProperties> | null } = { pQueueFamilyProperties: null};
			gpu.getPhysicalDeviceQueueFamilyProperties (out);
			if (out.pQueueFamilyProperties == null) {
        throw new Error('out.pQueueFamilyProperties == null');        
      }

			if (out.pQueueFamilyProperties.length < 0) {
        throw new Error('out.pQueueFamilyProperties.length < 0');
      }

      let queueFamilyIndex = 0;
      if (presentationSurface != null) {
        queueFamilyIndex = MgDriverContext.findAppropriateQueueFamilyForSurface(
          gpu
          , presentationSurface
          , out.pQueueFamilyProperties
          , requestedQueueType);
      }
      else {
        queueFamilyIndex = MgDriverContext.findAppropriateQueueFamily(
          out.pQueueFamilyProperties
          , requestedQueueType);
      }  

      let noOfQueues = (requestCount == MgQueueAllocation.ONE) 
        ? 1 
        : out.pQueueFamilyProperties [queueFamilyIndex].queueCount;

      let queuePriorities = new Array<number>(noOfQueues);
      for (let i = 0; i < noOfQueues; i += 1) {
        // NOTE: a priority of 0 was picked at random by me
        queuePriorities[i] = 0;
      }

      let createInfo = new MgDeviceQueueCreateInfo();
      createInfo.queueFamilyIndex = queueFamilyIndex;
      createInfo.queueCount = noOfQueues;
      createInfo.queuePriorities = queuePriorities;

      return this.createDeviceB (gpu, createInfo, enabledExtensions);
    }

    private createDeviceB(
      gpu: IMgPhysicalDevice
      , queueCreateInfo: MgDeviceQueueCreateInfo
      , enabledExtensions: Array<string>      
    ) : IMgLogicalDevice {
      let deviceCreateInfo = new MgDeviceCreateInfo();

      let qcis = new Array<MgDeviceQueueCreateInfo>(1);
      qcis.push(queueCreateInfo);
      deviceCreateInfo.queueCreateInfos = qcis;
      deviceCreateInfo.enabledExtensionNames = enabledExtensions;

      let out_0 : { pDevice: IMgDevice | null} = { pDevice: null };
      let err = gpu.createDevice(deviceCreateInfo, null, out_0);
      if (err != MgResult.SUCCESS) {
        throw new Error('createLogicalDevice - IMgPhysicalDevice.createDevice');
      }

      let device : IMgDevice = out_0.pDevice as IMgDevice;
      // Get the graphics queue
      let noOfQueues = queueCreateInfo.queueCount;
      let availableQueues = new Array<IMgQueueInfo>(noOfQueues);
      for(let i = 0; i < noOfQueues; i += 1) {
        let out_1: { pQueue: IMgQueue | null } = { pQueue: null };
        device.getDeviceQueue(queueCreateInfo.queueFamilyIndex, i, out_1);
        
        let queue : IMgQueue = out_1.pQueue as IMgQueue;
        availableQueues[i] = new MgQueueInfo(
          i
          , gpu
          , device
          , queueCreateInfo.queueFamilyIndex
          , queue          
        );
      }

      return new MgLogicalDevice (gpu, device, availableQueues);
    }

    private static findAppropriateQueueFamily(
      queueProps: Array<MgQueueFamilyProperties>
      , requestedQueueType: MgQueueFlagBits
    ) : number {

      const NOT_FOUND = 0;
      let isFound : boolean = false;
      let family : number = NOT_FOUND;
			for (let i = 0; i < queueProps.length; i += 1)
			{
				// Find a queue that supports gfx
				if ((queueProps[i].queueFlags & requestedQueueType) == requestedQueueType) {
					family = i;
          isFound = true;
          break;
				}
			}

      if (!isFound) {
		    throw new Error("Could not find a queue");
      }

      return family;
    }

    private static findAppropriateQueueFamilyForSurface(
      gpu: IMgPhysicalDevice
      , presentationSurface: IMgSurfaceKHR
      , queueProps: Array<MgQueueFamilyProperties>
      , requestedQueueType: MgQueueFlagBits
    ) : number {
      
      let noOfQueues: number = queueProps.length;
      let supportsPresent = new Array<boolean>(queueProps.length);
      
      let ref : {pSupported: boolean} = { pSupported: false };
      // Iterate over each queue to learn whether it supports presenting:
      for (let i = 0; i < noOfQueues; i += 1) {
        gpu.getPhysicalDeviceSurfaceSupportKHR(
          i
          , presentationSurface
          , ref);
        supportsPresent[i] = ref.pSupported;
      }

			// Search for a graphics and a present queue in the array of queue
			// families, try to find one that supports both
      const MAX_QUEUE_NODE = 4294967295;
      let requestedQueueNodeIndex = MAX_QUEUE_NODE;
			let presentQueueNodeIndex = MAX_QUEUE_NODE;

      for (let i = 0; i < noOfQueues; i += 1) {
        let queue = queueProps[i];
        if ((queue.queueFlags & requestedQueueType) != 0) {
          if (requestedQueueNodeIndex == MAX_QUEUE_NODE) {
            requestedQueueNodeIndex = i;
          }
          if (supportsPresent[i]) {
            requestedQueueNodeIndex = i;
            presentQueueNodeIndex = i;
            break;
          }
        }
      }

			if (presentQueueNodeIndex == MAX_QUEUE_NODE) {
        // If didn't find a queue that supports both graphics and present, then
				// find a separate present queue.
        for(let i = 0; i < noOfQueues; i += 1) {
          if (supportsPresent[i]) {
            presentQueueNodeIndex = i;
            break;
          }
        }
      }

			if (requestedQueueNodeIndex == MAX_QUEUE_NODE)
			{
				throw new Error ("Could not find queue of requested queue type");
			}

			// Generate error if could not find both a graphics and a present queue
			if (presentQueueNodeIndex == MAX_QUEUE_NODE)
			{
				throw new Error ("Could not find a presentation queue");
			}

      // VERBATIM from cube.c
			// TODO: Add support for separate queues, including presentation,
			//       synchronization, and appropriate tracking for QueueSubmit.
			// NOTE: While it is possible for an application to use a separate graphics
			//       and a present queues, this demo program assumes it is only using
			//       one:
			if (requestedQueueNodeIndex != presentQueueNodeIndex)
			{
				throw new Error ("Could not find an common queue");
			}

      return requestedQueueNodeIndex;
    }

    private mIsDisposed : boolean = false;
    dispose(): void {
      if (!this.mIsDisposed) {
        if (this.mInstance) {
          this.mInstance.destroyInstance(null);
        }

        this.mIsDisposed = true;
      }
    }
  }
}