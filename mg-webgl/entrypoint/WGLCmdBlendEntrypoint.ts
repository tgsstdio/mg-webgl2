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
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext'; 

export class WGLCmdBlendEntrypoint implements IWGLCmdBlendEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    glContext: IWGLBackbufferContext
    , errHandler: IWGLErrorHandler
  ) {
    this.mGLContext = glContext;
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
    const BLEND: number = 0x0BE2;

		if (blendEnabled) {
		  this.mGLContext.gl.enable(BLEND);
    }
		else {
			this.mGLContext.gl.disable(BLEND);
    }
    this.mErrHandler.logGLError("enableBlending");
  }   

  setColorMask(
    colorMask: MgColorComponentFlagBits
  ) : void {
		this.mGLContext.gl.colorMask(
      (colorMask & MgColorComponentFlagBits.R_BIT) ==  MgColorComponentFlagBits.R_BIT,
      (colorMask & MgColorComponentFlagBits.G_BIT) == MgColorComponentFlagBits.G_BIT,
      (colorMask & MgColorComponentFlagBits.B_BIT) == MgColorComponentFlagBits.B_BIT,
      (colorMask & MgColorComponentFlagBits.A_BIT) == MgColorComponentFlagBits.A_BIT
    ); 
  }

	private getBlendFactorSrc(
    blend: MgBlendFactor
  ): number {
    const ZERO: number = 0;
    const ONE: number = 1;
    const SRC_COLOR: number = 0x0300;
    const ONE_MINUS_SRC_COLOR: number = 0x0301;
    const SRC_ALPHA: number = 0x0302;
    const ONE_MINUS_SRC_ALPHA: number = 0x0303;
    const DST_ALPHA: number = 0x0304;
    const ONE_MINUS_DST_ALPHA: number = 0x0305;

    const DST_COLOR: number = 0x0306;
    const ONE_MINUS_DST_COLOR: number = 0x0307;
    const SRC_ALPHA_SATURATE: number =  0x0308;    

    switch (blend) {
      case MgBlendFactor.DST_ALPHA:
        return DST_ALPHA;
      case MgBlendFactor.DST_COLOR:
        return DST_COLOR;
      case MgBlendFactor.ONE_MINUS_DST_ALPHA:
        return ONE_MINUS_DST_ALPHA;
      case MgBlendFactor.ONE_MINUS_DST_COLOR:
        return ONE_MINUS_DST_COLOR;
      case MgBlendFactor.ONE_MINUS_SRC_ALPHA:
        return ONE_MINUS_SRC_ALPHA;
      case MgBlendFactor.ONE_MINUS_SRC_COLOR:
        return ONE_MINUS_SRC_COLOR;
			case MgBlendFactor.SRC_ALPHA:
				return SRC_ALPHA;
			case MgBlendFactor.SRC_ALPHA_SATURATE:
				return SRC_ALPHA_SATURATE;
			case MgBlendFactor.SRC_COLOR:
				return SRC_COLOR;
			case MgBlendFactor.ZERO:
				return ZERO;
			case MgBlendFactor.ONE:
        return ONE;      
			default:      
				return ONE;
    }
  }

	private getBlendFactorDest(
    blend: MgBlendFactor
  ) : number {
    const ZERO: number = 0;
    const ONE: number = 1;
    const SRC_COLOR: number = 0x0300;
    const ONE_MINUS_SRC_COLOR: number = 0x0301;
    const SRC_ALPHA: number = 0x0302;
    const ONE_MINUS_SRC_ALPHA: number = 0x0303;
    const DST_ALPHA: number = 0x0304;
    const ONE_MINUS_DST_ALPHA: number = 0x0305;

    switch (blend) {
      case MgBlendFactor.DST_ALPHA:
        return DST_ALPHA;
    case MgBlendFactor.ONE_MINUS_DST_ALPHA:
      return ONE_MINUS_DST_ALPHA;
    case MgBlendFactor.ONE_MINUS_SRC_ALPHA:
      return ONE_MINUS_SRC_ALPHA;
    case MgBlendFactor.ONE_MINUS_SRC_COLOR:
      return ONE_MINUS_SRC_COLOR;
    case MgBlendFactor.ONE:
      return ONE;
    case MgBlendFactor.SRC_ALPHA:
      return SRC_ALPHA;
    case MgBlendFactor.SRC_COLOR:
      return SRC_COLOR;
    case MgBlendFactor.ZERO:
      return ZERO;
    default:
      return ONE;
    }
  }

  applyBlendSeparateFunction (
      srcColor: MgBlendFactor
    ,	dstColor: MgBlendFactor
    , srcAlpha: MgBlendFactor 
    ,	destAlpha: MgBlendFactor
  ): void {
		this.mGLContext.gl.blendFuncSeparate(
			this.getBlendFactorSrc(srcColor),
			this.getBlendFactorDest(dstColor), 
			this.getBlendFactorSrc(srcAlpha), 
			this.getBlendFactorDest(destAlpha)
    );
    this.mErrHandler.logGLError("ApplyBlendSeparateFunction");    
  }
  
  setBlendConstants(blendConstants: MgColor4f): void {
    this.mGLContext.gl.blendColor(
      blendConstants.r
      , blendConstants.g
      , blendConstants.b
      , blendConstants.a);
    this.mErrHandler.logGLError("SetBlendConstants");    
  } 
}