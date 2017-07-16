import {IWGLFenceEntrypoint}
	from './IWGLFenceEntrypoint';	  
import {WGLSyncObject}
	from '../WGLSyncObject';	  
import {WGLSynchronizableFence}
	from '../WGLSynchronizableFence';
import {IMgFence}
  from '../../mg/IMgFence';  
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';  

export class WGLSynchronizableFenceEntrypoint implements IWGLFenceEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  constructor(glContext: IWGLBackbufferContext) {
    this.mGLContext = glContext;
  }

  createFence(): IMgFence {
    let syncObject = new WGLSyncObject(this.mGLContext.gl);
    return new WGLSynchronizableFence(syncObject);
  }
}