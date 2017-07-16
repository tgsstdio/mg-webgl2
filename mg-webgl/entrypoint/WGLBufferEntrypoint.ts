import {MgBufferCreateInfo}
	from '../../mg/MgBufferCreateInfo';   
import {IWGLBufferEntrypoint}
	from './IWGLBufferEntrypoint';	  
import {IWGLBuffer}
	from '../IWGLBuffer';
import {WGLBuffer}
	from '../WGLBuffer';	
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';

export class WGLBufferEntrypoint implements IWGLBufferEntrypoint {
	private mGLContext: IWGLBackbufferContext;
	constructor(glContext: IWGLBackbufferContext) {
		this.mGLContext = glContext;
	}

	createBuffer( 			
		createInfo: MgBufferCreateInfo
	) : IWGLBuffer {
		return new WGLBuffer(this.mGLContext.gl, createInfo);
	}
}
