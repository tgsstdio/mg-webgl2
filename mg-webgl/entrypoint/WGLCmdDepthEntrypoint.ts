import {MgCompareOp}
	from '../../mg/MgCompareOp';   
import {IWGLCmdDepthEntrypoint}
	from '../entrypoint/IWGLCmdDepthEntrypoint';	  
import {IWGLErrorHandler}
  from '../entrypoint/IWGLErrorHandler';
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';  

export class WGLCmdDepthEntrypoint implements IWGLCmdDepthEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    glContext: IWGLBackbufferContext
    , errHandler: IWGLErrorHandler
  ) {
    this.mGLContext = glContext;
    this.mErrHandler = errHandler;
  }

	getDefaultEnums() : MgCompareOp {
    return MgCompareOp.LESS;
  }

	initialize() : MgCompareOp {
    this.enableDepthBuffer ();
    this.setDepthBufferFunc (MgCompareOp.LESS);
    this.setDepthMask(true);
    return this.getDefaultEnums ();
  }
	
	enableDepthBuffer(): void {
    const DEPTH_TEST: number = 0x0B71;

		this.mGLContext.gl.enable(DEPTH_TEST);
    this.mErrHandler.logGLError("enableDepthBuffer");
  }

	disableDepthBuffer(): void {
    const DEPTH_TEST: number = 0x0B71;

		this.mGLContext.gl.disable(DEPTH_TEST);
    this.mErrHandler.logGLError("disableDepthBuffer");
  }

  private getDepthFunction(
    compare: MgCompareOp
  ): number {
    const NEVER: number = 0x0200;
    const LESS: number = 0x0201;
    const EQUAL: number = 0x0202;
    const LEQUAL: number = 0x0203;
    const GREATER: number = 0x0204;
    const NOTEQUAL: number = 0x0205;
    const GEQUAL: number = 0x0206;
    const ALWAYS: number = 0x0207;

    switch (compare) {
      case MgCompareOp.ALWAYS:
        return ALWAYS;
      case MgCompareOp.EQUAL:
        return EQUAL;
      case MgCompareOp.GREATER:
        return GREATER;
      case MgCompareOp.GREATER_OR_EQUAL:
        return GEQUAL;
      case MgCompareOp.LESS:
        return LESS;
      case MgCompareOp.LESS_OR_EQUAL:
        return LEQUAL;
      case MgCompareOp.NEVER:
        return NEVER;
      case MgCompareOp.NOT_EQUAL:
        return NOTEQUAL;
      default:
        throw new Error('not supported');      
    }
  }

	setDepthBufferFunc(func: MgCompareOp): void {
		this.mGLContext.gl.depthFunc(
      this.getDepthFunction(func)
    );

    this.mErrHandler.logGLError("setDepthBufferFunc");
  }

	setDepthMask(isMaskOn :boolean): void {
		// for writing to depth buffer
		this.mGLContext.gl.depthMask(isMaskOn);
    this.mErrHandler.logGLError("setDepthMask");
  }
}