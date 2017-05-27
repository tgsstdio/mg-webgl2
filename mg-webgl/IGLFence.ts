namespace Magnesium {
  export interface IGLFence extends IMgFence {
    readonly isSignalled: boolean;
    reset() : void;
    beginSync() : void;
  }
}