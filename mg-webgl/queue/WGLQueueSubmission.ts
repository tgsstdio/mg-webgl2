import {IWGLSemaphore} from '../IWGLSemaphore'
import {IWGLCommandBuffer} from '../cmdbuf/IWGLCommandBuffer'
import {MgSubmitInfo} from '../../mg/MgSubmitInfo'

export class WGLQueueSubmission {
  key : number;
  waits: Array<IWGLSemaphore>;
  signals: Array<IWGLSemaphore>;
  commandBuffers: Array<IWGLCommandBuffer>;
  orderFence: IWGLSemaphore;
  
  constructor(key: number, sub: MgSubmitInfo) {
    this.key = key;

    this.waits = new Array<IWGLSemaphore>();
    if (sub.waitSemaphores != null) {
      for (let signal of sub.waitSemaphores) {
        let semaphore = signal.waitSemaphore as IWGLSemaphore;
        if (semaphore != null) {
          this.waits.push(semaphore);
        }
      }
    }

    this.signals = new Array<IWGLSemaphore>();
		if (sub.signalSemaphores != null) {
			for (let signal of sub.signalSemaphores) {
			  let semaphore = signal as IWGLSemaphore;
				if (semaphore != null) {
					this.signals.push(semaphore);
				}
			}
		}

    this.commandBuffers = new Array<IWGLCommandBuffer>();
    if (sub.commandBuffers != null) {
      for (let buf of sub.commandBuffers) {
        let glCmdBuf = buf as IWGLCommandBuffer;
        if (glCmdBuf != null) {
          this.commandBuffers.push (glCmdBuf);
        }
      }
    }   
  }
}
