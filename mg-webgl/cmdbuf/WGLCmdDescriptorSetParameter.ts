import {IWGLDescriptorSet} from '../IWGLDescriptorSet';
import {IWGLPipelineLayout} from '../pipeline/IWGLPipelineLayout';
import {MgPipelineBindPoint} from '../../mg/MgPipelineBindPoint'

export class WGLCmdDescriptorSetParameter {
  descriptorSet: IWGLDescriptorSet|null;
  layout: IWGLPipelineLayout|null;
  dynamicOffsets: Array<number>|null;
  bindpoint: MgPipelineBindPoint;
}
