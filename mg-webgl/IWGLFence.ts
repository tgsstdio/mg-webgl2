namespace Magnesium {
  export interface IWGLFence extends IMgFence {
    readonly isSignalled: boolean;
    reset() : void;
    beginSync() : void;
    isReady(timeInNanoSecs: number) : boolean;
  }
}