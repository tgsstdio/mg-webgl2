/// <reference path="../mg/IMgSemaphore.ts" />

namespace Magnesium {
  export interface IWGLSemaphore extends IMgSemaphore {
    isReady () : boolean;
    reset () : void;
    beginSync() : void;    
  }
}