namespace Magnesium {
	export interface IWGLGraphicsPipelineEntrypoint {
		createProgram() : WebGLProgram;
		attach(
			program: WebGLProgram
			, shader: WebGLShader) : void;
		link(program: WebGLProgram): void;
		isCompiled(program: WebGLProgram): boolean;
		getCompilerMessages(program: WebGLProgram): string;
	}
}