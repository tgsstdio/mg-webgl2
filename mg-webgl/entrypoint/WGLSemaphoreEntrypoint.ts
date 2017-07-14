import {IWGLSemaphoreEntrypoint}
	from './IWGLSemaphoreEntrypoint';	  
import {WGLSemaphore}
	from '../WGLSemaphore';
import {IWGLSemaphore}
	from '../IWGLSemaphore';	
import {WGLSyncObject}
	from '../WGLSyncObject';	

export class WGLSemaphoreEntrypoint implements IWGLSemaphoreEntrypoint {
  private mGL: WebGL2RenderingContext;
  constructor(gl:WebGL2RenderingContext) {
    this.mGL = gl;
  }  
  
  createSemaphore() : IWGLSemaphore {
    let syncObject = new WGLSyncObject(this.mGL);    
    return new WGLSemaphore(syncObject);
  }
}
