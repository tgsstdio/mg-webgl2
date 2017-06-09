namespace Magnesium {
	export interface IWGLCmdShaderProgramCache {
		readonly programID: WebGLProgram|null;
    setProgramID(
      bindingPoint: MgPipelineBindPoint
      , programID: WebGLProgram
      , layoutCache: WGLInternalBlockCache
      , pipelineLayout: IWGLPipelineLayout
    ) : void;

    readonly vao: WebGLVertexArrayObject|null;
		setVAO(vertexArray: WebGLVertexArrayObject) : void;
    setDescriptorSets(ds: WGLCmdDescriptorSetParameter) : void;
  }
}