/// <reference path="MgDriverContext.ts" />
/// <reference path="IMgPresentationSurface.ts" />
/// <reference path="IMgLogicalDevice.ts" />
/// <reference path="MgDeviceExtensionOptions.ts" />

namespace Magnesium {
	export class MgDefaultGraphicsConfiguration implements IMgGraphicsConfiguration {    
    private mDriverContext: MgDriverContext;
    private mPresentationSurface: IMgPresentationSurface;

    constructor(
      context: MgDriverContext
      , presentationSurface: IMgPresentationSurface
    )	{
      this.mDriverContext = context;
			this.mPresentationSurface = presentationSurface;            
		}

    private mPartition: IMgThreadPartition;
    get partition(): IMgThreadPartition {
      return this.mPartition;
    }

    get device(): IMgDevice {
      return this.mPartition.device;
    }

    get queue(): IMgQueue {
      return this.mPartition.queue;
    }

    private mLogicalDevice : IMgLogicalDevice;
    initialize(
      width: number
      , height: number
    ) : void {
      this.releaseUnmanagedResources();
      this.mPresentationSurface.initialize(width, height);
      this.mLogicalDevice = this.mDriverContext.createLogicalDevice(
        this.mPresentationSurface.surface
        , MgDeviceExtensionOptions.ALL
        , MgQueueAllocation.ONE
        , MgQueueFlagBits.GRAPHICS_BIT | MgQueueFlagBits.COMPUTE_BIT
      );

      const FIRST_QUEUE = 0;
      this.mPartition = this.mLogicalDevice.queues[FIRST_QUEUE].createPartition(MgCommandPoolCreateFlagBits.RESET_COMMAND_BUFFER_BIT);
    }

    private mIsDisposed: boolean = false;
    dispose() : void {
      if (!this.mIsDisposed) {

        this.releaseUnmanagedResources();

        this.mIsDisposed = true;
      }
    }

    private releaseUnmanagedResources(): void {
      if (this.mPartition != null) {
         this.mPartition.dispose();         
      }

      if (this.mLogicalDevice != null) {
        this.mLogicalDevice.dispose();
      }
    }

  }
}