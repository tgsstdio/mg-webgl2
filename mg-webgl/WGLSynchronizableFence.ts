import {IWGLSynchronizableFence}
	from './IWGLSynchronizableFence';	 
import {IMgDevice}
	from '../mg/IMgDevice';  
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';       
import {IWGLSyncObject}
	from './IWGLSyncObject';

export class WGLSynchronizableFence implements IWGLSynchronizableFence {
  private mSyncObject: IWGLSyncObject;
  constructor(sync: IWGLSyncObject) {
    this.mSyncObject = sync;
  }

  get syncObject(): IWGLSyncObject {
    return this.mSyncObject;
  }
  
  private mIsDisposed: boolean = false;
  destroyFence(device : IMgDevice
  , allocator : IMgAllocationCallbacks|null) : void {
    if (this.mIsDisposed)
      return;

    this.mSyncObject.dispose();
    this.mIsDisposed = true;
  }
}