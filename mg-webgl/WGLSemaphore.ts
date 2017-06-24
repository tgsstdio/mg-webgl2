import {IWGLSemaphore} from './IWGLSemaphore';
import {IMgDevice} from '../mg/IMgDevice';
import {IMgAllocationCallbacks} from '../mg/IMgAllocationCallbacks';

export class WGLSemaphore implements IWGLSemaphore {
  constructor() {

  }

  destroySemaphore(
    device: IMgDevice
    , allocator: IMgAllocationCallbacks|null
  ): void {

  }

  isReady () : boolean {
    return true;
  }

  reset () : void {

  }

  beginSync() : void {

  }
}
