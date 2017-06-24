import {IMgDevice}
	from '../mg/IMgDevice';	   
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';
import {IWGLHtmlSwapchainKHR}
	from './IWGLHtmlSwapchainKHR';

export class WGLHtmlSwapchainKHR implements IWGLHtmlSwapchainKHR
{
  constructor() {
  }

  private mIndex: number;
  private mMaxNoOfImages: number;
  initialize(
    maxNoOfImages: number
  ): void {
    this.mIndex = maxNoOfImages - 1;
    this.mMaxNoOfImages = maxNoOfImages;
  }

  getNextImage(): number {
    this.mIndex = (this.mIndex + 1) % this.mMaxNoOfImages;
    return this.mIndex;
  }

  swapBuffers () : void	{

  }

  destroySwapchainKHR(
    device: IMgDevice
        , allocator: IMgAllocationCallbacks|null
  ) : void {

  }
}



