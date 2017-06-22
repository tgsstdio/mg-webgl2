/// <reference path="Magnesium.ts" />

export interface IMgGraphicsConfiguration extends IMgDisposable {
      
  readonly device: IMgDevice;
  readonly partition: IMgThreadPartition;
  readonly queue: IMgQueue;

  initialize(width: number, height: number) : void;
}
