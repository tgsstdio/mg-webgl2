import {IWGLFenceEntrypoint}
	from './IWGLFenceEntrypoint';	  
import {WGLSyncObject}
	from './WGLSyncObject';	  
import {WGLSynchronizableFence}
	from './WGLSynchronizableFence';
import {IMgFence}
	from '../mg/IMgFence';  

export class WGLSynchronizableFenceEntrypoint implements IWGLFenceEntrypoint {
  private mGL: WebGL2RenderingContext;
  constructor(gl:WebGL2RenderingContext) {
    this.mGL = gl;
  }

  createFence(): IMgFence {
    let syncObject = new WGLSyncObject(this.mGL);
    return new WGLSynchronizableFence(syncObject);
  }
}