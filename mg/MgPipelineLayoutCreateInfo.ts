import {IMgDescriptorSetLayout} from './IMgDescriptorSetLayout'
import {MgPushConstantRange} from './MgPushConstantRange'

export class MgPipelineLayoutCreateInfo	{
  flags : number;
  setLayouts : Array<IMgDescriptorSetLayout>;
  pushConstantRanges : Array<MgPushConstantRange>|null;
}
