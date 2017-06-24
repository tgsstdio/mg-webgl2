import {MgCommandBufferInheritanceInfo}
	from './MgCommandBufferInheritanceInfo';
import {MgCommandBufferUsageFlagBits}
	from './MgCommandBufferUsageFlagBits';	

export class MgCommandBufferBeginInfo {
  flags: MgCommandBufferUsageFlagBits;
  inheritanceInfo: MgCommandBufferInheritanceInfo;
}
