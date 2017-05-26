namespace Magnesium {
  export class WGLPresentationSurface 
    implements IMgPresentationSurface {    
    private mCanvas: string;
    constructor(elementName: string) {
      this.mCanvas = elementName;
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
}