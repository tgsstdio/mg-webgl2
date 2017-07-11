import {IWGLCmdClearEntrypoint}
	from '../entrypoint/IWGLCmdClearEntrypoint';	
import {WGLClearValueState}
	from '../pipeline/WGLClearValueState';	  
import {WGLQueueClearBufferMask}
	from '../queue/WGLQueueClearBufferMask';
import {IWGLErrorHandler}
	from '../entrypoint/IWGLErrorHandler';	  
import {MgColor4f}
	from '../../mg/MgColor4f';    

export class WGLCmdClearEntrypoint implements IWGLCmdClearEntrypoint {
  private mGL: WebGL2RenderingContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    gl: WebGL2RenderingContext
    , errHandler: IWGLErrorHandler
  ) {
    this.mGL = gl;
    this.mErrHandler = errHandler;
  }

	initialize () : WGLClearValueState {
    let result = new WGLClearValueState();
    result.clearColor = new MgColor4f(0, 0, 0, 0);
    result.depthValue = 1;
    result.stencilValue = 0;
    
    this.setClearColor (result.clearColor);
    this.setClearDepthValue (result.depthValue);
    this.setClearStencilValue (result.stencilValue);
    return result;
  }

	clearBuffers(combinedMask: WGLQueueClearBufferMask) : void {
		let bitmask : number
      = (
          (combinedMask & WGLQueueClearBufferMask.COLOR)
           == WGLQueueClearBufferMask.COLOR
        ) 
        ? this.mGL.COLOR_BUFFER_BIT
        : 0;
        
		bitmask |= 
      (
        (combinedMask & WGLQueueClearBufferMask.DEPTH)
         == WGLQueueClearBufferMask.DEPTH
      )
      ? this.mGL.DEPTH_BUFFER_BIT
      : 0;

		bitmask |=       
      (
        (combinedMask & WGLQueueClearBufferMask.STENCIL)
        == WGLQueueClearBufferMask.STENCIL
      ) 
      ? this.mGL.STENCIL_BUFFER_BIT
      : 0;
		this.mGL.clear (bitmask);
    this.mErrHandler.logGLError('clearBuffers');    
  }

	setClearStencilValue(stencil: number): void {
    this.mGL.clearStencil(stencil);
    this.mErrHandler.logGLError('setClearStencilValue');
  }

	setClearDepthValue(depth: number) : void {
    this.mGL.clearDepth(depth);
    this.mErrHandler.logGLError('setClearDepthValue');
  }
  
	setClearColor(clearValue: MgColor4f) : void {
    this.mGL.clearColor(
      clearValue.r
      , clearValue.g
      , clearValue.b
      , clearValue.a
    );
    this.mErrHandler.logGLError('setClearColor');    
  }
}