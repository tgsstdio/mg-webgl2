import {IWGLFenceEntrypoint}
	from './IWGLFenceEntrypoint';	  
import {IWGLFence}
	from './IWGLFence';
import {WGLFence}
	from './WGLFence';	

export class WGLFenceEntrypoint implements IWGLFenceEntrypoint {
  private mGL: WebGL2RenderingContext;
  constructor(gl: WebGL2RenderingContext) {
    this.mGL = gl;
  }
  
  createFence(): IWGLFence {
    return new WGLFence(this.mGL);
  }
}
