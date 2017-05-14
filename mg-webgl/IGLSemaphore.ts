/// <reference path="../mg/IMgSemaphore.ts" />

namespace Magnesium {
  export interface IGLSemaphore extends IMgSemaphore {
    isReady () : boolean;
    reset () : void;
    beginSync() : void;    
  }
}