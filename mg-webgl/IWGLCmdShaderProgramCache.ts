namespace Magnesium {
	export interface IWGLCmdShaderProgramCache {
		readonly programID: WebGLProgram;
    setProgramID(
      bindingPoint: MgPipelineBindPoint
      , programID: WebGLProgram
      , layoutCache: WGLInternalBlockCache
      , pipelineLayout: IWGLPipelineLayout
    ) : void;

    readonly vao: WebGLVertexArrayObject;
		setVAO(vertexArray: WebGLVertexArrayObject) : void;
    setDescriptorSets(ds: WGLCmdDescriptorSetParameter) : void;
  }
}