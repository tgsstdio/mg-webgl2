import {IMgCommandPool}
	from './IMgCommandPool';
import {MgCommandBufferLevel}
	from './MgCommandBufferLevel';	

export class MgCommandBufferAllocateInfo {
  commandPool: IMgCommandPool;
  level: MgCommandBufferLevel;
  commandBufferCount: number;
}
