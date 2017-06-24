import {IMgSemaphore} from '../mg/IMgSemaphore';

export interface IWGLSemaphore extends IMgSemaphore {
  isReady () : boolean;
  reset () : void;
  beginSync() : void;    
}
