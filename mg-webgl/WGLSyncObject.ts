import {IWGLSyncObject}
	from './IWGLSyncObject';	  
import {IMgDevice}
	from '../mg/IMgDevice';	    
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';  

export class WGLSyncObject implements IWGLSyncObject {
  private mGL: WebGL2RenderingContext;
  private mIsSignalled: boolean;
  get isSignalled(): boolean {
    return this.mIsSignalled;
  }

  private mSyncObject: WebGLSync|null;
  private mWaitOption: number;
  constructor(
    gl: WebGL2RenderingContext
  ) {
    this.mGL = gl;
    this.mIsSignalled = true;
    this.mSyncObject = null;
  }

  public dispose(): void {
    if (this.mSyncObject != null) {
      this.mGL.deleteSync(this.mSyncObject);
      this.mSyncObject = null;
    }
  }

  reset(): void {
    this.mIsSignalled = true;
    this.dispose();
  }

  beginSync(): void {
    this.mSyncObject = this.mGL.fenceSync(this.mGL.SYNC_GPU_COMMANDS_COMPLETE, 0);
    this.mIsSignalled = false;
    this.mWaitOption = this.mGL.SYNC_FLUSH_COMMANDS_BIT;
  }

  isReady(timeInNanoSecs: number): boolean {
    if (!this.mIsSignalled) {
      let needBlocking: boolean = true;
      if (this.isFirstFenceCheck()) {
        needBlocking = this.nonBlockingWait();
      }

      if (needBlocking) {
        this.mIsSignalled = this.recheck();
      }
      else {
        this.mIsSignalled = true;
      }
    }

    return this.mIsSignalled;
  } 

  private isFirstFenceCheck(): boolean {
    return this.mWaitOption == this.mGL.SYNC_FLUSH_COMMANDS_BIT;
  }

  private nonBlockingWait(): boolean {
    // only on the first time
    let sync = this.mSyncObject as WebGLSync;
    let result = this.mGL.clientWaitSync(sync, this.mWaitOption, 0);
    if (result == this.mGL.WAIT_FAILED) {
      throw new Error("GPU NonBlockingWait sync failed - surplus actions incomplete");
    }

    this.mWaitOption = this.mGL.NONE;
      // HAS NOT COMPLETED
    return !(
      result == this.mGL.CONDITION_SATISFIED
      || result == this.mGL.ALREADY_SIGNALED
    );
  }

  private recheck(): boolean {
    let sync = this.mSyncObject as WebGLSync;
    let status = this.mGL.clientWaitSync(sync, this.mWaitOption, 0);
    // BLOCKING WAITING 
    if (status == this.mGL.WAIT_FAILED) {
      throw new Error("GPU recheck sync failed - surplus actions completed");
    }
    // HAS NOT COMPLETED
    return (
      status == this.mGL.CONDITION_SATISFIED
      || status == this.mGL.ALREADY_SIGNALED
    );
  }
}