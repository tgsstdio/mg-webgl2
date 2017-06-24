import {IMgDisposable}
	from './IMgDisposable';	
import {IMgDevice}
	from './IMgDevice';	
import {IMgThreadPartition}
	from './IMgThreadPartition';	
import {IMgQueue}
	from './IMgQueue';

export interface IMgGraphicsConfiguration extends IMgDisposable {
      
  readonly device: IMgDevice;
  readonly partition: IMgThreadPartition;
  readonly queue: IMgQueue;

  initialize(width: number, height: number) : void;
}
