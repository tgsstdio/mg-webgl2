import {IMgCommandBuffer}
	from './IMgCommandBuffer';	  
import {IMgSemaphore}
	from './IMgSemaphore';	

export interface IMgPresentationLayer {
  beginDraw(
    postPresent: IMgCommandBuffer
    , presentComplete: IMgSemaphore
    , timeout:number) : number;

  endDraw(nextImage: Array<number>
  , prePresent: IMgCommandBuffer
  , renderComplete: Array<IMgSemaphore>): void
}
