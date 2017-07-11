import {MgGraphicsPipelineCreateInfo}
	from '../../mg/MgGraphicsPipelineCreateInfo';   
import {WGLProgramUniformBlock}
	from '../pipeline/WGLProgramUniformBlock';	  

export interface IWGLGraphicsPipelineCompilerEntrypoint {
  compile(info: MgGraphicsPipelineCreateInfo): WebGLProgram;
  inspect(program: WebGLProgram) : Array<WGLProgramUniformBlock>
}

