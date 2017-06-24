import {IMgDevice}
	from '../mg/IMgDevice';	  
import {MgResult}
	from '../mg/MgResult';	  
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';

import {IMgCommandPool}
	from '../mg/IMgCommandPool';  
import {MgCommandPoolCreateFlagBits}
	from '../mg/MgCommandPoolCreateFlagBits'; 
import {IWGLCommandBuffer}
	from './IWGLCommandBuffer';	  
import {}
	from './';     

export class WGLCommandPool implements IMgCommandPool {
  private mFlags: MgCommandPoolCreateFlagBits;
  get flags(): MgCommandPoolCreateFlagBits {
    return this.mFlags;
  }

  private mBuffers: Array<IWGLCommandBuffer>;
  get buffers(): Array<IWGLCommandBuffer> {
    return this.mBuffers;
  }

  constructor(
    flags: MgCommandPoolCreateFlagBits
  ) {
    this.mFlags = flags;
    this.mBuffers = new Array<IWGLCommandBuffer>();
  }

  private mIsDisposed: boolean = false;
  destroyCommandPool(
    device: IMgDevice
    , allocator: IMgAllocationCallbacks|null
  ) : void {
    if (!this.mIsDisposed) {

      this.mIsDisposed = true;
    }
  }

  resetCommandPool(
    device: IMgDevice
  , flags: MgCommandPoolResetFlagBits
  ) : MgResult {
    if (this.mIsDisposed)
      return MgResult.SUCCESS;

    for (let buffer of this.mBuffers) {
      buffer.resetAllData ();
    }

    return MgResult.SUCCESS;
  }
}
