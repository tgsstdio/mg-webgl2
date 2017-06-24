
import {MgShaderStageFlagBits}
	from '../mg/MgShaderStageFlagBits';  
import {IWGLUniformBlockEntrypoint}
	from './IWGLUniformBlockEntrypoint';	  
import {IWGLErrorHandler}
	from './IWGLErrorHandler';
import {WGLActiveUniformBlockInfo}
	from './WGLActiveUniformBlockInfo';	


export class WGLUniformBlockEntrypoint implements IWGLUniformBlockEntrypoint {
  private mGL: WebGL2RenderingContext;
  private mErrorHandler: IWGLErrorHandler;    
  constructor(
    gl: WebGL2RenderingContext
    , errorHandler: IWGLErrorHandler
  ) {
    this.mGL = gl;
    this.mErrorHandler = errorHandler;
  }

  getNoOfActiveUniformBlocks(program: WebGLProgram) : number {
    let noOfUniformBlocks = 0;
    noOfUniformBlocks = this.mGL.getProgramParameter(
      program
      , this.mGL.ACTIVE_UNIFORM_BLOCKS) as number;
    this.mErrorHandler.checkError();
    return noOfUniformBlocks;
  }

  getActiveUniformBlockName(
    program: WebGLProgram
    , index: number
  ) : string {
    let name = this.mGL.getActiveUniformBlockName(program, index) as string;
    this.mErrorHandler.checkError();
    return name;
  }

  getActiveUniformBlockInfo(
    program: WebGLProgram
    , index: number
  ) : WGLActiveUniformBlockInfo {
      let binding = this.mGL.getProgramParameter(
        program
        , this.mGL.UNIFORM_BLOCK_BINDING) as number;
      this.mErrorHandler.checkError();          

      let bufferDataSize = this.mGL.getProgramParameter(
        program
        , this.mGL.UNIFORM_BLOCK_DATA_SIZE) as number;
      this.mErrorHandler.checkError();  

      let refByFragmentShader = this.mGL.getProgramParameter(
        program
        , this.mGL.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER) as number;
      this.mErrorHandler.checkError();  

      let refByVertexShader = this.mGL.getProgramParameter(
        program
        , this.mGL.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER) as number;          
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
