import {IWGLFence} from './IWGLFence';
import {IWGLSemaphore} from './IWGLSemaphore';

export class WGLQueueSubmitOrder {
  key : number;
  fence : IWGLFence;
  submissions: Map<number, IWGLSemaphore>;

  constructor(key: number) {
    this.key = key;
    this.submissions = new Map<number, IWGLSemaphore>();
  }
}  
