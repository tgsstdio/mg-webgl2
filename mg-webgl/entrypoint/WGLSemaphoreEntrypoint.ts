import {IWGLSemaphoreEntrypoint}
	from './IWGLSemaphoreEntrypoint';	  
import {WGLSemaphore}
	from '../WGLSemaphore';
import {IWGLSemaphore}
	from '../IWGLSemaphore';	


export class WGLSemaphoreEntrypoint implements IWGLSemaphoreEntrypoint {
  createSemaphore() : IWGLSemaphore {
    return new WGLSemaphore();
  }
}
