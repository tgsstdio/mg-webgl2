import {IWGLGraphicsPipeline} from '../pipeline/IWGLGraphicsPipeline';
import {WGLCmdGraphicsBag} from './WGLCmdGraphicsBag';
import {WGLCmdEncoderContextSorter} from './WGLCmdEncoderContextSorter';
import {IMgPipelineLayout} from '../../mg/IMgPipelineLayout';
import {IMgDescriptorSet} from '../../mg/IMgDescriptorSet';

export interface IWGLCmdDescriptorSetEncodingSection {
  clear(): void;
  invalidate(): void;
  pushIfRequired(
    pipeline: IWGLGraphicsPipeline|null
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter 
  ): void;    
  bind(
    layout: IMgPipelineLayout
    , firstSet: number
    , descriptorSetCount: number
    , pDescriptorSets: Array<IMgDescriptorSet>
    , pDynamicOffsets: Array<number>|null
  ) : void;    
}
