import {MgCompareOp}
	from '../../mg/MgCompareOp';   
import {IWGLCmdDepthEntrypoint}
	from '../entrypoint/IWGLCmdDepthEntrypoint';	  
import {IWGLErrorHandler}
	from '../entrypoint/IWGLErrorHandler';

export class WGLCmdDepthEntrypoint implements IWGLCmdDepthEntrypoint {
  private mGL: WebGL2RenderingContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    gl: WebGL2RenderingContext
    , errHandler: IWGLErrorHandler
  ) {
    this.mGL = gl;
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
		this.mGL.enable(this.mGL.DEPTH_TEST);
    this.mErrHandler.logGLError("enableDepthBuffer");
  }

	disableDepthBuffer(): void {
		this.mGL.disable(this.mGL.DEPTH_TEST);
    this.mErrHandler.logGLError("disableDepthBuffer");
  }

  private getDepthFunction(
    compare: MgCompareOp
  ): number {
    switch (compare) {
      case MgCompareOp.ALWAYS:
        return this.mGL.ALWAYS;
      case MgCompareOp.EQUAL:
        return this.mGL.EQUAL;
      case MgCompareOp.GREATER:
        return this.mGL.GREATER;
      case MgCompareOp.GREATER_OR_EQUAL:
        return this.mGL.GEQUAL;
      case MgCompareOp.LESS:
        return this.mGL.LESS;
      case MgCompareOp.LESS_OR_EQUAL:
        return this.mGL.LEQUAL;
      case MgCompareOp.NEVER:
        return this.mGL.NEVER;
      case MgCompareOp.NOT_EQUAL:
        return this.mGL.NOTEQUAL;
      default:
        throw new Error('not supported');      
    }
  }

	setDepthBufferFunc(func: MgCompareOp): void {
		this.mGL.depthFunc(
      this.getDepthFunction(func)
    );

    this.mErrHandler.logGLError("setDepthBufferFunc");
  }

	setDepthMask(isMaskOn :boolean): void {
		// for writing to depth buffer
		this.mGL.depthMask(isMaskOn);
    this.mErrHandler.logGLError("setDepthMask");
  }
}