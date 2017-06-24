import {IMgPresentationSurface}
	from '../mg/IMgPresentationSurface';  
import {IMgSurfaceKHR}
	from '../mg/IMgSurfaceKHR';  

export class WGLPresentationSurface 
  implements IMgPresentationSurface {    
  private mCanvas: HTMLCanvasElement;
  constructor(canvas: HTMLCanvasElement) {
    this.mCanvas = canvas;
  }

  initialize(width: number, height: number) : void {
    /**
     *  THINKING ABOUT ALTER CANVAS SIZE IF NECESSARY
    let elem = document.getElementById(this.mCanvas) as HTMLCanvasElement;
    elem.width = width;
    elem.height = height;
      */
  }

  get surface(): IMgSurfaceKHR | null {      
    return null;
  }
}
