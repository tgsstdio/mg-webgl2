import {MgPipelineBindPoint}
	from '../mg/MgPipelineBindPoint';
import {IMgPipelineLayout}
	from '../mg/IMgPipelineLayout';
import {IMgDescriptorSet}
	from '../mg/IMgDescriptorSet';
import {IWGLPipelineLayout}
	from './IWGLPipelineLayout';	
import {IWGLDescriptorSet}
	from './IWGLDescriptorSet';	

export interface IWGLDescriptorSetBinder	{
  clear() : void;
  bind(
    pipelineBindPoint: MgPipelineBindPoint
    , layout: IMgPipelineLayout
    , firstSet: number
    , descriptorSetCount: number
    , pDescriptorSets: Array<IMgDescriptorSet>
    , pDynamicOffsets: Array<number>|null) : void;
  readonly isInvalid: boolean;
  readonly boundPipelineLayout: IWGLPipelineLayout|null;
  readonly boundDynamicOffsets: Array<number>|null;
  readonly boundDescriptorSet: IWGLDescriptorSet|null;
}

