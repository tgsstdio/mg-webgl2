import {IWGLCmdScissorsEntrypoint}
	from './IWGLCmdScissorsEntrypoint';	  
import {WGLCmdViewportParameter}
	from '../cmdbuf/WGLCmdViewportParameter';
import {WGLCmdScissorParameter}
	from '../cmdbuf/WGLCmdScissorParameter';	
import {IWGLErrorHandler}
	from './IWGLErrorHandler';	
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';		

export class WGLCmdScissorsEntrypoint implements IWGLCmdScissorsEntrypoint {
	private mGLContext: IWGLBackbufferContext;
	private mErrHandler: IWGLErrorHandler;
	constructor(
		glContext: IWGLBackbufferContext
		, errHandler: IWGLErrorHandler
	) {
		this.mGLContext = glContext;
		this.mErrHandler = errHandler;
	}

	applyViewports (
		viewports: WGLCmdViewportParameter
	): void {	
		if (viewports.first != 0)
			throw new Error('first must be 0');

		this.mGLContext.gl.viewport(
			viewports.x
			, viewports.y
			, viewports.width
			, viewports.height
		);
		this.mErrHandler.logGLError("applyViewports.viewport");

		this.mGLContext.gl.depthRange(
			viewports.zNear
			, viewports.zFar
		);

		this.mErrHandler.logGLError("applyViewports.depthRange");		
	}

	applyScissors(
		scissors: WGLCmdScissorParameter
	): void {
		if (scissors.first != 0)
			throw new Error('first must be 0');

		this.mGLContext.gl.scissor(
			scissors.x
			, scissors.y
			, scissors.width
			, scissors.height
		);
		this.mErrHandler.logGLError("applyScissors");
	}
}