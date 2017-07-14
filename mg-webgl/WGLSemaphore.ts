import {IWGLSemaphore} from './IWGLSemaphore';

import {IWGLSynchronizableFence}
	from './IWGLSynchronizableFence';	 
import {IMgDevice}
	from '../mg/IMgDevice';  
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';       
import {IWGLSyncObject}
	from './IWGLSyncObject';

export class WGLSemaphore implements IWGLSemaphore {
  private mSyncObject: IWGLSyncObject;
  constructor(sync: IWGLSyncObject) {
    this.mSyncObject = sync;
  }

  get syncObject(): IWGLSyncObject {
    return this.mSyncObject;
  }
  
  private mIsDisposed: boolean = false;
  destroySemaphore(device : IMgDevice
  , allocator : IMgAllocationCallbacks|null) : void {
    if (this.mIsDisposed)
      return;

    this.mSyncObject.dispose();
    this.mIsDisposed = true;
  }

  isReady () : boolean {
    return this.mSyncObject.isReady(0);
  }

  reset () : void {
    this.mSyncObject.reset();
  }

  beginSync() : void {
    this.mSyncObject.beginSync();
  }
}
