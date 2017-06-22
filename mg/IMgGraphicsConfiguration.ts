/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export interface IMgGraphicsConfiguration
      extends IMgDisposable {
        
    readonly device: IMgDevice;
    readonly partition: IMgThreadPartition;
    readonly queue: IMgQueue;

    initialize(width: number, height: number) : void;
  }
}