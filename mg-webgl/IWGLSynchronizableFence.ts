import {IMgFence}
	from '../mg/IMgFence'; 
import {IWGLSyncObject}
	from './IWGLSyncObject';	  

export interface IWGLSynchronizableFence extends IMgFence {
  readonly syncObject: IWGLSyncObject;
}