namespace Magnesium {
  export interface IGLFence extends IMgFence {
    reset() : void;
    beginSync() : void;
  }
}