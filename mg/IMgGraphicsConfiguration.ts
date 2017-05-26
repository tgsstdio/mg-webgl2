/// <reference path="../mg/MgApplicationInfo.ts" />
/// <reference path="../mg/IMgCommandPool.ts" />
/// <reference path="../mg/IMgQueue.ts" />
/// <reference path="IMgThreadPartition.ts" />
/// <reference path="IMgDisposable.ts" />

namespace Magnesium {
  export interface IMgGraphicsConfiguration
      extends IMgDisposable {
        
    readonly device: IMgDevice;
    readonly partition: IMgThreadPartition;
    readonly queue: IMgQueue;

    initialize(width: number, height: number) : void;
  }
}