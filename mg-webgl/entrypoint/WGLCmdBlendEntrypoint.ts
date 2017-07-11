import {IWGLCmdBlendEntrypoint} 
  from './IWGLCmdBlendEntrypoint';
import {WGLGraphicsPipelineBlendColorState} 
  from '../pipeline/WGLGraphicsPipelineBlendColorState';
import {WGLGraphicsPipelineBlendColorAttachmentState} 
  from '../pipeline/WGLGraphicsPipelineBlendColorAttachmentState';  
import {MgColorComponentFlagBits}
	from '../../mg/MgColorComponentFlagBits';  
import {MgBlendOp}
	from '../../mg/MgBlendOp'; 
import {MgBlendFactor}
	from '../../mg/MgBlendFactor';  
import {IWGLErrorHandler}
	from './IWGLErrorHandler'; 
import {MgColor4f}
	from '../../mg/MgColor4f';   

export class WGLCmdBlendEntrypoint implements IWGLCmdBlendEntrypoint {
  private mGL: WebGL2RenderingContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    gl: WebGL2RenderingContext
    , errHandler: IWGLErrorHandler
  ) {
    this.mGL = gl;
    this.mErrHandler = errHandler;
  }

  initialize(
    noOfAttachments: number
  ): WGLGraphicsPipelineBlendColorState {
			let initialState = new WGLGraphicsPipelineBlendColorState();
      //initialState.logicOpEnable = false;
			//initialState.logicOp = MgLogicOp.COPY;
			let attachments = new Array<WGLGraphicsPipelineBlendColorAttachmentState>(noOfAttachments);			

			for (let i = 0; i < noOfAttachments; i += 1) {
				let attachment = new WGLGraphicsPipelineBlendColorAttachmentState();
				attachment.blendEnable = false;
				attachment.colorWriteMask
           = MgColorComponentFlagBits.R_BIT 
           | MgColorComponentFlagBits.G_BIT
           | MgColorComponentFlagBits.B_BIT
           | MgColorComponentFlagBits.A_BIT;
				attachment.colorBlendOp = MgBlendOp.ADD;
				attachment.alphaBlendOp = MgBlendOp.ADD;
				attachment.srcColorBlendFactor = MgBlendFactor.ONE;
				attachment.dstColorBlendFactor = MgBlendFactor.ZERO;
				attachment.srcAlphaBlendFactor = MgBlendFactor.ONE;
				attachment.dstAlphaBlendFactor = MgBlendFactor.ZERO;				
				attachments[i] = attachment;
			}

      // no independant blending allowed
      let attachment = attachments[0];
      this.enableBlending (attachment.blendEnable);
      this.setColorMask (attachment.colorWriteMask);
      this.applyBlendSeparateFunction (
        attachment.srcColorBlendFactor,
        attachment.dstColorBlendFactor,
        attachment.srcAlphaBlendFactor,
        attachment.dstAlphaBlendFactor);

      initialState.attachments = attachments;

			return initialState;
  }

  enableBlending(
    blendEnabled: boolean
  ) : void {
		if (blendEnabled) {
		  this.mGL.enable(this.mGL.BLEND);
    }
		else {
			this.mGL.disable(this.mGL.BLEND);
    }
    this.mErrHandler.logGLError("enableBlending");
  }   

  setColorMask(
    colorMask: MgColorComponentFlagBits
  ) : void {
		this.mGL.colorMask(
      (colorMask & MgColorComponentFlagBits.R_BIT) ==  MgColorComponentFlagBits.R_BIT,
      (colorMask & MgColorComponentFlagBits.G_BIT) == MgColorComponentFlagBits.G_BIT,
      (colorMask & MgColorComponentFlagBits.B_BIT) == MgColorComponentFlagBits.B_BIT,
      (colorMask & MgColorComponentFlagBits.A_BIT) == MgColorComponentFlagBits.A_BIT
    ); 
  }

	private getBlendFactorSrc(
    blend: MgBlendFactor
  ): number {
    switch (blend) {
      case MgBlendFactor.DST_ALPHA:
        return this.mGL.DST_ALPHA;
      case MgBlendFactor.DST_COLOR:
        return this.mGL.DST_COLOR;
      case MgBlendFactor.ONE_MINUS_DST_ALPHA:
        return this.mGL.ONE_MINUS_DST_ALPHA;
      case MgBlendFactor.ONE_MINUS_DST_COLOR:
        return this.mGL.ONE_MINUS_DST_COLOR;
      case MgBlendFactor.ONE_MINUS_SRC_ALPHA:
        return this.mGL.ONE_MINUS_SRC_ALPHA;
      case MgBlendFactor.ONE_MINUS_SRC_COLOR:
        return this.mGL.ONE_MINUS_SRC_COLOR;
			case MgBlendFactor.SRC_ALPHA:
				return this.mGL.SRC_ALPHA;
			case MgBlendFactor.SRC_ALPHA_SATURATE:
				return this.mGL.SRC_ALPHA_SATURATE;
			case MgBlendFactor.SRC_COLOR:
				return this.mGL.SRC_COLOR;
			case MgBlendFactor.ZERO:
				return this.mGL.ZERO;
			case MgBlendFactor.ONE:
        return this.mGL.ONE;      
			default:      
				return this.mGL.ONE;
    }
  }

	private getBlendFactorDest(
    blend: MgBlendFactor
  ) : number {
    switch (blend) {
      case MgBlendFactor.DST_ALPHA:
        return this.mGL.DST_ALPHA;
    case MgBlendFactor.ONE_MINUS_DST_ALPHA:
      return this.mGL.ONE_MINUS_DST_ALPHA;
    case MgBlendFactor.ONE_MINUS_SRC_ALPHA:
      return this.mGL.ONE_MINUS_SRC_ALPHA;
    case MgBlendFactor.ONE_MINUS_SRC_COLOR:
      return this.mGL.ONE_MINUS_SRC_COLOR;
    case MgBlendFactor.ONE:
      return this.mGL.ONE;
    case MgBlendFactor.SRC_ALPHA:
      return this.mGL.SRC_ALPHA;
    case MgBlendFactor.SRC_COLOR:
      return this.mGL.SRC_COLOR;
    case MgBlendFactor.ZERO:
      return this.mGL.ZERO;
    default:
      return this.mGL.ONE;
    }
  }

  applyBlendSeparateFunction (
      srcColor: MgBlendFactor
    ,	dstColor: MgBlendFactor
    , srcAlpha: MgBlendFactor 
    ,	destAlpha: MgBlendFactor
  ): void {
		this.mGL.blendFuncSeparate(
			this.getBlendFactorSrc(srcColor),
			this.getBlendFactorDest(dstColor), 
			this.getBlendFactorSrc(srcAlpha), 
			this.getBlendFactorDest(destAlpha)
    );
    this.mErrHandler.logGLError("ApplyBlendSeparateFunction");    
  }
  
  setBlendConstants(blendConstants: MgColor4f): void {
    this.mGL.blendColor(
      blendConstants.r
      , blendConstants.g
      , blendConstants.b
      , blendConstants.a);
    this.mErrHandler.logGLError("SetBlendConstants");    
  } 
}