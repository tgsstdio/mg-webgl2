
import {MgShaderStageFlagBits}
	from '../../mg/MgShaderStageFlagBits';  
import {IWGLUniformBlockEntrypoint}
	from './IWGLUniformBlockEntrypoint';	  
import {IWGLErrorHandler}
	from './IWGLErrorHandler';
import {WGLActiveUniformBlockInfo}
	from '../pipeline/WGLActiveUniformBlockInfo';	
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';

export class WGLUniformBlockEntrypoint implements IWGLUniformBlockEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  private mErrorHandler: IWGLErrorHandler;    
  constructor(
    glContext: IWGLBackbufferContext
    , errorHandler: IWGLErrorHandler
  ) {
    this.mGLContext = glContext;
    this.mErrorHandler = errorHandler;
  }

  getNoOfActiveUniformBlocks(program: WebGLProgram) : number {
    const ACTIVE_UNIFORM_BLOCKS: number = 0x8A36;
    
    let noOfUniformBlocks = 0;
    noOfUniformBlocks = this.mGLContext.gl.getProgramParameter(
      program
      , ACTIVE_UNIFORM_BLOCKS) as number;
    this.mErrorHandler.checkError();
    return noOfUniformBlocks;
  }

  getActiveUniformBlockName(
    program: WebGLProgram
    , index: number
  ) : string {
    let name = this.mGLContext.gl.getActiveUniformBlockName(program, index) as string;
    this.mErrorHandler.checkError();
    return name;
  }

  getActiveUniformBlockInfo(
    program: WebGLProgram
    , index: number
  ) : WGLActiveUniformBlockInfo {
      const UNIFORM_BLOCK_BINDING: number = 0x8A3F;

      let binding = this.mGLContext.gl.getProgramParameter(
        program
        , UNIFORM_BLOCK_BINDING) as number;
      this.mErrorHandler.checkError();          

      const UNIFORM_BLOCK_DATA_SIZE : number = 0x8A40;
      let bufferDataSize = this.mGLContext.gl.getProgramParameter(
        program
        , UNIFORM_BLOCK_DATA_SIZE) as number;
      this.mErrorHandler.checkError();  

      const UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: number = 0x8A46;
      let refByFragmentShader = this.mGLContext.gl.getProgramParameter(
        program
        , UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER) as number;
      this.mErrorHandler.checkError();  

      const UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: number = 0x8A44;
      let refByVertexShader = this.mGLContext.gl.getProgramParameter(
        program
        , UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER) as number;          
      this.mErrorHandler.checkError();          

      let stage : MgShaderStageFlagBits = refByFragmentShader ? (MgShaderStageFlagBits.FRAGMENT_BIT) : 0;
      stage |= refByVertexShader != 0 ? (MgShaderStageFlagBits.VERTEX_BIT) : 0;

      let result = new WGLActiveUniformBlockInfo();        
      result.bindingIndex = binding;
      result.stage = stage;
      result.stride = bufferDataSize;
      return result;
  }
}
