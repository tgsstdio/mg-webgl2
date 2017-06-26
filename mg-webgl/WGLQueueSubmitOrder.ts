import {IWGLSynchronizableFence} from './IWGLSynchronizableFence';
import {IWGLSemaphore} from './IWGLSemaphore';

export class WGLQueueSubmitOrder {
  key : number;
  fence : IWGLSynchronizableFence;
  submissions: Map<number, IWGLSemaphore>;

  constructor(key: number) {
    this.key = key;
    this.submissions = new Map<number, IWGLSemaphore>();
  }
}  
