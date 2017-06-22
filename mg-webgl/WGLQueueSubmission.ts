import {IWGLSemaphore} from './IWGLSemaphore'
import {IWGLCommandBuffer} from './IWGLCommandBuffer'
import {MgSubmitInfo} from '../mg/MgSubmitInfo'

export class WGLQueueSubmission {
  key : number;
  waits: Array<IWGLSemaphore>;
  signals: Array<IWGLSemaphore>;
  commandBuffers: Array<IWGLCommandBuffer>;
  orderFence: IWGLSemaphore;
  
  constructor(key: number, submit: MgSubmitInfo) {
    this.key = key;
  }
}
