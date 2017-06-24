import {IMgDevice}
	from '../mg/IMgDevice';
import {IMgQueue}
	from './IMgQueue';	  
import {MgCommandPoolCreateFlagBits}
	from './MgCommandPoolCreateFlagBits';
import {IMgThreadPartition}
	from './IMgThreadPartition';  

export interface IMgQueueInfo	{
  readonly queueIndex: number;
  readonly queueFamilyIndex: number;
  readonly device: IMgDevice;
  readonly queue: IMgQueue;
  createPartition (
    flags: MgCommandPoolCreateFlagBits
  ) : IMgThreadPartition;
}
  