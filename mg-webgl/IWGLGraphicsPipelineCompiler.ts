namespace Magnesium {
	export interface IWGLGraphicsPipelineCompiler {
		compile(info: MgGraphicsPipelineCreateInfo): number;
    //GLUniformBlockEntry[] Inspect(int programId);
  }
}
