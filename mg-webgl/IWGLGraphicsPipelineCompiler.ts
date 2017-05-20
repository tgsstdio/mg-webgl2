namespace Magnesium {
	export interface IWGLGraphicsPipelineCompiler {
		compile(info: MgGraphicsPipelineCreateInfo): WebGLProgram;
    inspect(program: WebGLProgram) : Array<WGLProgramUniformBlock>
  }
}
