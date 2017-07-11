import {IWGLCmdScissorsEntrypoint}
	from './IWGLCmdScissorsEntrypoint';	  
import {WGLCmdViewportParameter}
	from '../cmdbuf/WGLCmdViewportParameter';
import {WGLCmdScissorParameter}
	from '../cmdbuf/WGLCmdScissorParameter';	
import {IWGLErrorHandler}
	from './IWGLErrorHandler';	

export class WGLCmdScissorsEntrypoint implements IWGLCmdScissorsEntrypoint {
	private mGL: WebGL2RenderingContext;
	private mErrHandler: IWGLErrorHandler;
	constructor(
		gl: WebGL2RenderingContext
		, errHandler: IWGLErrorHandler
	) {
		this.mGL = gl;
		this.mErrHandler = errHandler;
	}

	applyViewports (
		viewports: WGLCmdViewportParameter
	): void {	
		if (viewports.first != 0)
			throw new Error('first must be 0');

		this.mGL.viewport(
			viewports.x
			, viewports.y
			, viewports.width
			, viewports.height
		);
		this.mErrHandler.logGLError("applyViewports.viewport");

		this.mGL.depthRange(
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

		this.mGL.scissor(
			scissors.x
			, scissors.y
			, scissors.width
			, scissors.height
		);
		this.mErrHandler.logGLError("applyScissors");
	}
}