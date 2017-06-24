import {MgBufferCreateInfo}
	from '../mg/MgBufferCreateInfo';   
import {IWGLBufferEntrypoint}
	from './IWGLBufferEntrypoint';	  
import {IWGLBuffer}
	from './IWGLBuffer';
import {WGLBuffer}
	from './WGLBuffer';	

export class WGLBufferEntrypoint implements IWGLBufferEntrypoint {
	private mGL: WebGL2RenderingContext;
	constructor(gl: WebGL2RenderingContext) {
		this.mGL = gl;
	}

	createBuffer( 			
		createInfo: MgBufferCreateInfo
	) : IWGLBuffer {
		return new WGLBuffer(this.mGL, createInfo);
	}
}
