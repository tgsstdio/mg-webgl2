import {MgDescriptorPoolCreateFlagBits}
	from './MgDescriptorPoolCreateFlagBits';	
import {MgDescriptorPoolSize}
	from './MgDescriptorPoolSize';

export class MgDescriptorPoolCreateInfo {
  flags : MgDescriptorPoolCreateFlagBits;
  maxSets : number;
  poolSizes : Array<MgDescriptorPoolSize>;
}
