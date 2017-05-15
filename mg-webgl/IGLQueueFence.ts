namespace Magnesium {
  export interface IGLQueueFence extends IMgFence {
    signal() : boolean;
  }
}