import {IMgDevice}
	from '../mg/IMgDevice';	  
import {IMgFramebuffer}
	from '../mg/IMgFramebuffer';	  
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';

export class WGLFramebuffer implements IMgFramebuffer {
  destroyFramebuffer(
    device: IMgDevice
    , allocator: IMgAllocationCallbacks|null
  ) : void {
    
  }
}
