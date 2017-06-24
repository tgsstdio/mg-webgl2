import {IMgCommandPool}
	from '../mg/IMgCommandPool';
import {MgCommandPoolCreateFlagBits}
	from '../mg/MgCommandPoolCreateFlagBits';  
import {IWGLCommandBuffer}
	from './IWGLCommandBuffer';

export interface IWGLCommandPool extends IMgCommandPool {
  readonly flags: MgCommandPoolCreateFlagBits;
  readonly buffers: Array<IWGLCommandBuffer>;
}
