namespace Magnesium {
	export class WGLGraphicsPipelineEntrypoint 
		implements IWGLGraphicsPipelineEntrypoint	{
		private mGL: WebGL2RenderingContext;
		constructor(gl: WebGL2RenderingContext) {
			this.mGL = gl;
		}
		
		createProgram() : WebGLProgram {
			let program = this.mGL.createProgram() as WebGLProgram;
			return program;
		}

		attach(
			program: WebGLProgram
			, shader: WebGLShader
		) : void {
			this.mGL.attachShader(program, shader);
			this.mGL.deleteShader(shader);
		}

		link(program: WebGLProgram): void {
			this.mGL.linkProgram(program);
		}

		isCompiled(program: WebGLProgram): boolean {
			let result: boolean = this.mGL.getProgramParameter(
				program
				, gl.LINK_STATUS);
			return result;
		}

		getCompilerMessages(program: WebGLProgram): string {
			let message = this.mGL.getProgramInfoLog(program) as string;
			return message;
		}

		deleteProgram(program: WebGLProgram) : void {
			this.mGL.deleteProgram(program);
		}
	}
}