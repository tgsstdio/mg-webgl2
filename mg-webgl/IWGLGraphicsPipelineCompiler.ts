import {MgGraphicsPipelineCreateInfo}
	from '../mg/MgGraphicsPipelineCreateInfo';   
import {WGLProgramUniformBlock}
	from './WGLProgramUniformBlock';	  

export interface IWGLGraphicsPipelineCompiler {
  compile(info: MgGraphicsPipelineCreateInfo): WebGLProgram;
  inspect(program: WebGLProgram) : Array<WGLProgramUniformBlock>
}

