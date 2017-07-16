import {IWGLCmdRasterizationEntrypoint}
	from './IWGLCmdRasterizationEntrypoint';	  
import {IWGLErrorHandler}
	from './IWGLErrorHandler';
import {WGLRasterizerState}
	from '../pipeline/WGLRasterizerState';	
import {WGLGraphicsPipelineFlagBits}
	from '../pipeline/WGLGraphicsPipelineFlagBits';
import {WGLCmdDepthBiasParameter}
	from '../cmdbuf/WGLCmdDepthBiasParameter';	    
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';

export class WGLCmdRasterizationEntrypoint
  implements IWGLCmdRasterizationEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    glContext: IWGLBackbufferContext
    , errHandler: IWGLErrorHandler
  ) {
    this.mGLContext =glContext;
    this.mErrHandler = errHandler;
  }

	disablePolygonOffset (): void {
    const POLYGON_OFFSET_FILL : number = 0x8037;

		this.mGLContext.gl.disable(POLYGON_OFFSET_FILL);
		this.mErrHandler.logGLError("disablePolygonOffset");
  }

	enablePolygonOffset(
		slopeScaleDepthBias: number
		, depthBias:number
	) : void {
    const POLYGON_OFFSET_FILL : number = 0x8037;

		this.mGLContext.gl.enable(POLYGON_OFFSET_FILL);
		this.mGLContext.gl.polygonOffset(slopeScaleDepthBias, depthBias);
		this.mErrHandler.logGLError("enablePolygonOffset");
  }

	setUsingCounterClockwiseWindings(
		flag: boolean): void {
    const CW: number = 0x0900;
    const CCW: number = 0x0901;

    if (flag) {
      this.mGLContext.gl.frontFace(CCW);
    } 
    else {
      this.mGLContext.gl.frontFace(CW);
    }

    this.mErrHandler.logGLError("setUsingCounterClockwiseWindings");
  }

	enableScissorTest(): void {
    const SCISSOR_TEST: number = 0x0C11;

		this.mGLContext.gl.enable(SCISSOR_TEST);
		this.mErrHandler.logGLError("enableScissorTest");    
  }

	disableScissorTest(): void {
    const SCISSOR_TEST: number = 0x0C11;
    
		this.mGLContext.gl.disable(SCISSOR_TEST);
		this.mErrHandler.logGLError("disableScissorTest");  
  }

	setCullingMode(
		front: boolean
		, back: boolean
	): void {
    const FRONT: number = 0x0404;
    const BACK: number = 0x0405;
    const FRONT_AND_BACK: number = 0x0408;

    if (front && back) {
      this.mGLContext.gl.cullFace(FRONT_AND_BACK);
    }
    else if (front) {
      this.mGLContext.gl.cullFace(FRONT);
    }
    else if (back) {
      this.mGLContext.gl.cullFace(BACK);
    }
    else {
      // not sure about this
      this.disableCulling ();
    }

    this.mErrHandler.logGLError("setCullingMode");    
  }

	enableCulling(): void {
    const CULL_FACE: number = 0x0B44;

		this.mGLContext.gl.enable(CULL_FACE);
		this.mErrHandler.logGLError("enableCulling");
  }

	disableCulling(): void {
    const CULL_FACE: number = 0x0B44;

		this.mGLContext.gl.disable(CULL_FACE);
		this.mErrHandler.logGLError("disableCulling");
  }

	initialize(): WGLRasterizerState {
    let initialValue = new WGLRasterizerState();    
    initialValue.flags = 
      WGLGraphicsPipelineFlagBits.SCISSOR_TEST_ENABLED 
      | WGLGraphicsPipelineFlagBits.CULL_BACK_FACES 
      | WGLGraphicsPipelineFlagBits.USE_COUNTER_CLOCKWISE_WINDINGS;
        // ! QueueDrawItemBitFlags.CullingEnabled,
    let depthBias = new WGLCmdDepthBiasParameter();
    depthBias.depthBiasClamp = 0;
    depthBias.depthBiasConstantFactor = 0;
    depthBias.depthBiasSlopeFactor = 0;
    initialValue.depthBias = depthBias;

    this.enableScissorTest ();
    this.disableCulling ();

    this.setCullingMode (
      (initialValue.flags & WGLGraphicsPipelineFlagBits.CULL_FRONT_FACES)
      == WGLGraphicsPipelineFlagBits.CULL_FRONT_FACES
      ,(initialValue.flags & WGLGraphicsPipelineFlagBits.CULL_BACK_FACES)
      == WGLGraphicsPipelineFlagBits.CULL_BACK_FACES
    );
    this.setUsingCounterClockwiseWindings (
      (initialValue.flags & WGLGraphicsPipelineFlagBits.USE_COUNTER_CLOCKWISE_WINDINGS)
      == WGLGraphicsPipelineFlagBits.USE_COUNTER_CLOCKWISE_WINDINGS
    );

    this.disablePolygonOffset ();

    return initialValue;    
  }
}