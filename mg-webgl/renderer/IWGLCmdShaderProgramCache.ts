import {MgPipelineBindPoint} from '../../mg/MgPipelineBindPoint';
import {WGLInternalBlockCache} from '../pipeline/WGLInternalBlockCache';
import {IWGLPipelineLayout} from '../pipeline/IWGLPipelineLayout';
import {WGLCmdDescriptorSetParameter} from '../cmdbuf/WGLCmdDescriptorSetParameter';

export interface IWGLCmdShaderProgramCache {
  readonly programID: WebGLProgram|null;
  setProgramID(
    bindingPoint: MgPipelineBindPoint
    , programID: WebGLProgram
    , layoutCache: WGLInternalBlockCache
    , pipelineLayout: IWGLPipelineLayout
  ) : void;

  readonly vao: WebGLVertexArrayObject|null;
  setVAO(vertexArray: WebGLVertexArrayObject|null) : void;
  setDescriptorSets(ds: WGLCmdDescriptorSetParameter) : void;
}
