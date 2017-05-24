namespace Magnesium {
  export class WGLErrorHandler implements IWGLErrorHandler {
		private mGL: WebGL2RenderingContext;
    constructor(gl: WebGL2RenderingContext) {
      this.mGL = gl;
    }
    
    checkError() : void {
      let error = this.mGL.getError();

      if (error != this.mGL.NO_ERROR)
        throw new Error('WEBGL: ' + error);
    }

		logGLError(message: string) : void {
      let error = this.mGL.getError();

      if (error != this.mGL.NO_ERROR)
        console.log(message + ': ' + error);
    }

		trace(message: string) : void {
      console.log(message);
    }
  }
}