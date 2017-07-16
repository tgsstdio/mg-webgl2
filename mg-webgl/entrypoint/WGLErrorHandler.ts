import {IWGLErrorHandler}
	from './IWGLErrorHandler';	
import {IWGLBackbufferContext}
  from '../IWGLBackbufferContext';
    
export class WGLErrorHandler implements IWGLErrorHandler {
  private mGLContext: IWGLBackbufferContext;
  constructor(glContext: IWGLBackbufferContext) {
    this.mGLContext = glContext;
  }
  
  checkError() : void {
    let error = this.mGLContext.gl.getError();

    const NO_ERROR: number = 0;
    if (error != NO_ERROR)
      throw new Error('WEBGL: ' + error);
  }

  logGLError(message: string) : void {
    let error = this.mGLContext.gl.getError();

    const NO_ERROR: number = 0;
    if (error != NO_ERROR)
      console.log(message + ': ' + error);
  }

  trace(message: string) : void {
    console.log(message);
  }
}
