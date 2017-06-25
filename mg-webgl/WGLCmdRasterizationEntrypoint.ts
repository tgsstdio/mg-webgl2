import {}
	from '../mg/';  
import {}
	from '../mg/';   
import {IWGLCmdRasterizationEntrypoint}
	from './IWGLCmdRasterizationEntrypoint';	  
import {IWGLErrorHandler}
	from './IWGLErrorHandler';
import {WGLRasterizerState}
	from './WGLRasterizerState';	
import {WGLGraphicsPipelineFlagBits}
	from './WGLGraphicsPipelineFlagBits';
import {WGLCmdDepthBiasParameter}
	from './WGLCmdDepthBiasParameter';	  
import {}
	from './';
import {}
	from './';	  	  

export class WGLCmdRasterizationEntrypoint
  implements IWGLCmdRasterizationEntrypoint {
  private mGL: WebGL2RenderingContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    gl: WebGL2RenderingContext
    , errHandler: IWGLErrorHandler
  ) {
    this.mGL = gl;
    this.mErrHandler = errHandler;
  }

	disablePolygonOffset (): void {
		this.mGL.disable(this.mGL.POLYGON_OFFSET_FILL);
		this.mErrHandler.logGLError("disablePolygonOffset");
  }

	enablePolygonOffset(
		slopeScaleDepthBias: number
		, depthBias:number
	) : void {
		this.mGL.enable(this.mGL.POLYGON_OFFSET_FILL);
		this.mGL.polygonOffset(slopeScaleDepthBias, depthBias);
		this.mErrHandler.logGLError("enablePolygonOffset");
  }

	setUsingCounterClockwiseWindings(
		flag: boolean): void {
    if (flag) {
      this.mGL.frontFace(this.mGL.CCW);
    } 
    else {
      this.mGL.frontFace(this.mGL.CW);
    }

    this.mErrHandler.logGLError("setUsingCounterClockwiseWindings");
  }

	enableScissorTest(): void {
		this.mGL.enable(this.mGL.SCISSOR_TEST);
		this.mErrHandler.logGLError("enableScissorTest");    
  }

	disableScissorTest(): void {
		this.mGL.disable(this.mGL.SCISSOR_TEST);
		this.mErrHandler.logGLError("disableScissorTest");  
  }

	setCullingMode(
		front: boolean
		, back: boolean
	): void {
    if (front && back) {
      this.mGL.cullFace(this.mGL.FRONT_AND_BACK);
    }
    else if (front) {
      this.mGL.cullFace(this.mGL.FRONT);
    }
    else if (back) {
      this.mGL.cullFace(this.mGL.BACK);
    }
    else {
      // not sure about this
      this.disableCulling ();
    }

    this.mErrHandler.logGLError("setCullingMode");    
  }

	enableCulling(): void {
		this.mGL.enable(this.mGL.CULL_FACE);
		this.mErrHandler.logGLError("enableCulling");
  }

	disableCulling(): void {
		this.mGL.disable(this.mGL.CULL_FACE);
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