import {MgCompareOp}
	from '../../mg/MgCompareOp';  
import {MgStencilOp}
	from '../../mg/MgStencilOp';   
import {IWGLCmdStencilEntrypoint}
	from './IWGLCmdStencilEntrypoint';	  
import {WGLGraphicsPipelineStencilState}
	from '../pipeline/WGLGraphicsPipelineStencilState';
import {WGLQueueRendererStencilState}
	from '../queue/WGLQueueRendererStencilState';	  
import {WGLGraphicsPipelineStencilMasks}
	from '../pipeline/WGLGraphicsPipelineStencilMasks';
import {IWGLErrorHandler}
	from './IWGLErrorHandler';	  
import {MgStencilFaceFlagBits}
	from '../../mg/MgStencilFaceFlagBits';  
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';	     

export class WGLCmdStencilEntrypoint implements IWGLCmdStencilEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    glContext: IWGLBackbufferContext
    , errHandler: IWGLErrorHandler
  ) {
    this.mGLContext = glContext;
    this.mErrHandler = errHandler;
  }

  getDefaultEnums(): WGLGraphicsPipelineStencilState {
    let result = new WGLGraphicsPipelineStencilState(); 
    result.frontStencilFunction = MgCompareOp.ALWAYS;
    result.backStencilFunction = MgCompareOp.ALWAYS;
    result.frontStencilPass = MgStencilOp.KEEP;
    result.backStencilPass = MgStencilOp.KEEP;
    result.frontStencilFail = MgStencilOp.KEEP;;
    result.backStencilFail = MgStencilOp.KEEP;
    result.frontDepthBufferFail = MgStencilOp.KEEP;
    result.backDepthBufferFail = MgStencilOp.KEEP;    
    return result;
  }

  initialize(): WGLQueueRendererStencilState {
    let initialValue = new WGLQueueRendererStencilState();
    initialValue.flags = 0; // !QueueDrawItemBitFlags.StencilEnabled | !QueueDrawItemBitFlags.TwoSidedStencilMode
    const INT_MAX_VALUE = 0x7FFFFFFF;
    let front = new WGLGraphicsPipelineStencilMasks();
    front.writeMask = ~0;
    front.reference = ~0,
    front.compareMask = INT_MAX_VALUE;
    initialValue.front = front;

    let back = new WGLGraphicsPipelineStencilMasks();    
    back.writeMask = ~0;
    back.reference = ~0;
    back.compareMask = 0x7FFFFFFF;
    initialValue.back = back;

    initialValue.settings = this.getDefaultEnums();    

    this.disableStencilBuffer ();
    this.setStencilWriteMask(
      MgStencilFaceFlagBits.FRONT_BIT
      , initialValue.front.writeMask);

    this.setFrontFaceCullStencilFunction(
      initialValue.settings.frontStencilFunction
      , initialValue.front.reference
      , initialValue.front.compareMask);

    this.setBackFaceCullStencilFunction (
      initialValue.settings.backStencilFunction
      , initialValue.back.reference
      , initialValue.back.compareMask);
    
    this.setFrontFaceStencilOperation(
      initialValue.settings.frontStencilFail, initialValue.settings.frontDepthBufferFail, initialValue.settings.frontStencilPass);

    this.setBackFaceStencilOperation (
      initialValue.settings.frontStencilFail, initialValue.settings.frontDepthBufferFail, initialValue.settings.frontStencilPass);
      
    return initialValue;
  }

  enableStencilBuffer(): void {
    const STENCIL_TEST: number = 0x0B90;

		this.mGLContext.gl.disable(STENCIL_TEST);
    this.mErrHandler.logGLError("enableStencilBuffer");
  }

  disableStencilBuffer(): void {
    const STENCIL_TEST: number = 0x0B90;
    
		this.mGLContext.gl.disable(STENCIL_TEST);
    this.mErrHandler.logGLError("disableStencilBuffer");
  }

  setStencilWriteMask(
    face: MgStencilFaceFlagBits
    , mask: number
  ) : void {
    const FRONT: number = 0x0404;
    const BACK: number = 0x0405;
    const FRONT_AND_BACK: number = 0x0408;

    let glFaces : number = 0;
    switch(face) {
      case MgStencilFaceFlagBits.BACK_BIT:
        glFaces = BACK;
        break;
      case MgStencilFaceFlagBits.FRONT_BIT:
        glFaces = FRONT;
        break;
      case MgStencilFaceFlagBits.FRONT_AND_BACK:
        glFaces = FRONT_AND_BACK;
        break;
      default:
        throw new Error('not supported');
    }

    this.mGLContext.gl.stencilMaskSeparate(glFaces, mask);
    this.mErrHandler.logGLError("setStencilWriteMask");
  }

  setFrontFaceCullStencilFunction(
    func: MgCompareOp
    , referenceStencil: number
    , compare: number): void {
    const FRONT: number = 0x0404;

			this.mGLContext.gl.stencilFuncSeparate (
				FRONT,
				this.getStencilFunc (func),
				referenceStencil,
				compare);

    this.mErrHandler.logGLError("setFrontFaceCullStencilFunction");
  }

  private getStencilFunc(
    func: MgCompareOp
  ) : number {
    const NEVER: number = 0x0200;
    const LESS: number = 0x0201;
    const EQUAL: number = 0x0202;
    const LEQUAL: number = 0x0203;
    const GREATER: number = 0x0204;
    const NOTEQUAL: number = 0x0205;
    const GEQUAL: number = 0x0206;
    const ALWAYS: number = 0x0207;

    switch (func) {
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
        return ALWAYS;
    }
  }  

  setBackFaceCullStencilFunction( 
      func: MgCompareOp
    , referenceStencil: number
    , compare: number
  ): void {		
    const BACK: number = 0x0405;

    this.mGLContext.gl.stencilFuncSeparate (
      BACK,
      this.getStencilFunc (func),
      referenceStencil,
      compare);

    this.mErrHandler.logGLError("setBackFaceCullStencilFunction");  
  }

  setBothStencilCullStencilFunction( 
      func: MgCompareOp
    , referenceStencil: number
    , compare: number
  ): void {
    const FRONT_AND_BACK: number = 0x0408;

    this.mGLContext.gl.stencilFuncSeparate(
      FRONT_AND_BACK,
      this.getStencilFunc(func),
      referenceStencil,
      compare);

    this.mErrHandler.logGLError("setBothStencilCullStencilFunction");
  }    

  private getStencilOp(
    operation: MgStencilOp
  ) : number {
  const KEEP: number = 0x1E00;
  const REPLACE: number = 0x1E01;
  const INCR: number = 0x1E02;
  const DECR: number = 0x1E03;
  const INVERT: number = 0x150A;
  const INCR_WRAP: number = 0x8507;
  const DECR_WRAP: number = 0x8508;
  const ZERO: number = 0;

    switch (operation) {
    case MgStencilOp.KEEP:
      return KEEP;
    case MgStencilOp.DECREMENT_AND_WRAP:
      return DECR_WRAP;
    case MgStencilOp.DECREMENT_AND_CLAMP:
      return DECR;
    case MgStencilOp.INCREMENT_AND_CLAMP:
      return INCR;
    case MgStencilOp.INCREMENT_AND_WRAP:
      return INCR_WRAP;
    case MgStencilOp.INVERT:
      return INVERT;
    case MgStencilOp.REPLACE:
      return REPLACE;
    case MgStencilOp.ZERO:
      return ZERO;
    default:
      return KEEP;
    }
  }

  setFrontFaceStencilOperation(
    stencilFail: MgStencilOp
    , stencilDepthBufferFail: MgStencilOp
    , stencilPass: MgStencilOp
  ): void {			
    const FRONT: number = 0x0404;

    this.mGLContext.gl.stencilOpSeparate(
      FRONT
      , this.getStencilOp(stencilFail)
      , this.getStencilOp(stencilDepthBufferFail)
      , this.getStencilOp(stencilPass));
    this.mErrHandler.logGLError("setFrontFaceStencilOperation"); 
  }    

  setBackFaceStencilOperation(
    stencilFail: MgStencilOp
    , stencilDepthBufferFail: MgStencilOp
    , stencilPass: MgStencilOp
  ): void	{
    const BACK: number = 0x0405;

    this.mGLContext.gl.stencilOpSeparate(
      BACK
      , this.getStencilOp(stencilFail)
      , this.getStencilOp(stencilDepthBufferFail)
      , this.getStencilOp(stencilPass)
    );	
    this.mErrHandler.logGLError("setBackFaceStencilOperation");
  }    

  setStencilFunction(
    stencilFunction: MgCompareOp
    , referenceStencil: number
    , compare: number
  ): void {
		this.mGLContext.gl.stencilFunc(
			this.getStencilFunc (stencilFunction)
      , referenceStencil
      , compare);

    this.mErrHandler.logGLError("setStencilFunction");    
  }

  setStencilOperation(
    stencilFail: MgStencilOp
    ,	stencilDepthBufferFail: MgStencilOp
    ,	stencilPass: MgStencilOp
  ): void {
    this.mGLContext.gl.stencilOp(
      this.getStencilOp(stencilFail)
      , this.getStencilOp(stencilDepthBufferFail)
      , this.getStencilOp(stencilPass)
    );

    this.mErrHandler.logGLError("setStencilOperation");
  }
}