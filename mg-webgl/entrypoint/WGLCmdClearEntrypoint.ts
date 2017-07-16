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
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';

export class WGLCmdClearEntrypoint implements IWGLCmdClearEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    glContext: IWGLBackbufferContext
    , errHandler: IWGLErrorHandler
  ) {
    this.mGLContext = glContext;
    this.mErrHandler = errHandler;
  }

	initialize () : WGLClearValueState {
    const COLOR_CLEAR_VALUE: number = 0x0C22;
    const DEPTH_CLEAR_VALUE: number = 0x0B73;
    const STENCIL_CLEAR_VALUE: number = 0x0B91;

    let color = this.mGLContext.gl.getParameter(COLOR_CLEAR_VALUE);
    let depth = this.mGLContext.gl.getParameter(DEPTH_CLEAR_VALUE);
    let stencil = this.mGLContext.gl.getParameter(STENCIL_CLEAR_VALUE);

    let result = new WGLClearValueState();
    result.clearColor = new MgColor4f(color[0], color[1], color[2], color[3]);
    result.depthValue = depth;
    result.stencilValue = stencil;
    
    this.setClearColor (result.clearColor);
    this.setClearDepthValue (result.depthValue);
    this.setClearStencilValue (result.stencilValue);
    return result;
  }

	clearBuffers(combinedMask: WGLQueueClearBufferMask) : void {
    const COLOR_BUFFER_BIT: number = 0x00004000;
    const DEPTH_BUFFER_BIT: number = 0x00000100;
    const STENCIL_BUFFER_BIT: number = 0x00000400;
    
    let bitmask : number
      = (
          (combinedMask & WGLQueueClearBufferMask.COLOR)
           == WGLQueueClearBufferMask.COLOR
        ) 
        ? COLOR_BUFFER_BIT
        : 0;
        
		bitmask |= 
      (
        (combinedMask & WGLQueueClearBufferMask.DEPTH)
         == WGLQueueClearBufferMask.DEPTH
      )
      ? DEPTH_BUFFER_BIT
      : 0;

		bitmask |=       
      (
        (combinedMask & WGLQueueClearBufferMask.STENCIL)
        == WGLQueueClearBufferMask.STENCIL
      ) 
      ? STENCIL_BUFFER_BIT
      : 0;
		this.mGLContext.gl.clear (bitmask);
    this.mErrHandler.logGLError('clearBuffers');    
  }

	setClearStencilValue(stencil: number): void {
    this.mGLContext.gl.clearStencil(stencil);
    this.mErrHandler.logGLError('setClearStencilValue');
  }

	setClearDepthValue(depth: number) : void {
    this.mGLContext.gl.clearDepth(depth);
    this.mErrHandler.logGLError('setClearDepthValue');
  }
  
	setClearColor(clearValue: MgColor4f) : void {
    this.mGLContext.gl.clearColor(
      clearValue.r
      , clearValue.g
      , clearValue.b
      , clearValue.a
    );
    this.mErrHandler.logGLError('setClearColor');    
  }
}