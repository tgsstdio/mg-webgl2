import {IWGLGraphicsPipelineEntrypoint}
	from './IWGLGraphicsPipelineEntrypoint';	  
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';	

export class WGLGraphicsPipelineEntrypoint 
	implements IWGLGraphicsPipelineEntrypoint	{
	private mGLContext: IWGLBackbufferContext;
	constructor(glContext: IWGLBackbufferContext) {
		this.mGLContext = glContext;
	}
	
	createProgram() : WebGLProgram {
		let program = this.mGLContext.gl.createProgram() as WebGLProgram;
		return program;
	}

	attach(
		program: WebGLProgram
		, shader: WebGLShader
	) : void {
		this.mGLContext.gl.attachShader(program, shader);
		this.mGLContext.gl.deleteShader(shader);
	}

	link(program: WebGLProgram): void {
		this.mGLContext.gl.linkProgram(program);
	}

	isCompiled(program: WebGLProgram): boolean {
		const LINK_STATUS: number = 0x8B82;

		let result: boolean = this.mGLContext.gl.getProgramParameter(
			program
			, LINK_STATUS);
		return result;
	}

	getCompilerMessages(program: WebGLProgram): string {
		let message = this.mGLContext.gl.getProgramInfoLog(program) as string;
		return message;
	}

	deleteProgram(program: WebGLProgram) : void {
		this.mGLContext.gl.deleteProgram(program);
	}
}
