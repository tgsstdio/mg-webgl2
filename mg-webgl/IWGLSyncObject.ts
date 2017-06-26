import {IMgFence}
	from '../mg/IMgFence';  
import {IMgDisposable}
	from '../mg/IMgDisposable';    

export interface IWGLSyncObject extends IMgDisposable {
  readonly isSignalled: boolean;
  reset() : void;
  beginSync() : void;
  isReady(timeInNanoSecs: number) : boolean;
}
