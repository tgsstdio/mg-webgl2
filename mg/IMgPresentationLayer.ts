/// <reference path="Magnesium.ts" />

export interface IMgPresentationLayer {
  beginDraw(
    postPresent: IMgCommandBuffer
    , presentComplete: IMgSemaphore
    , timeout:number) : number;

  endDraw(nextImage: Array<number>
  , prePresent: IMgCommandBuffer
  , renderComplete: Array<IMgSemaphore>): void
}
