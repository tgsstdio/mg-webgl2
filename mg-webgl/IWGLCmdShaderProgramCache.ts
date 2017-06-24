import {MgPipelineBindPoint} from '../mg/MgPipelineBindPoint';
import {WGLInternalBlockCache} from './WGLInternalBlockCache';
import {IWGLPipelineLayout} from './IWGLPipelineLayout';
import {WGLCmdDescriptorSetParameter} from './WGLCmdDescriptorSetParameter';

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
