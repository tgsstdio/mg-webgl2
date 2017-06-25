import {MgCompareOp}
	from '../mg/MgCompareOp';  
import {MgStencilOp}
	from '../mg/MgStencilOp';   
import {IWGLCmdStencilEntrypoint}
	from './IWGLCmdStencilEntrypoint';	  
import {WGLGraphicsPipelineStencilState}
	from './WGLGraphicsPipelineStencilState';
import {WGLQueueRendererStencilState}
	from './WGLQueueRendererStencilState';	  
import {WGLGraphicsPipelineStencilMasks}
	from './WGLGraphicsPipelineStencilMasks';
import {IWGLErrorHandler}
	from './IWGLErrorHandler';	  
import {MgStencilFaceFlagBits}
	from '../mg/MgStencilFaceFlagBits';  
   

export class WGLCmdStencilEntrypoint implements IWGLCmdStencilEntrypoint {
  private mGL: WebGL2RenderingContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    gl: WebGL2RenderingContext
    , errHandler: IWGLErrorHandler
  ) {
    this.mGL = gl;
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
		this.mGL.disable(this.mGL.STENCIL_TEST);
    this.mErrHandler.logGLError("enableStencilBuffer");
  }

  disableStencilBuffer(): void {
		this.mGL.disable(this.mGL.STENCIL_TEST);
    this.mErrHandler.logGLError("disableStencilBuffer");
  }

  setStencilWriteMask(
    face: MgStencilFaceFlagBits
    , mask: number
  ) : void {
    let glFaces : number = 0;
    switch(face) {
      case MgStencilFaceFlagBits.BACK_BIT:
        glFaces = this.mGL.BACK;
        break;
      case MgStencilFaceFlagBits.FRONT_BIT:
        glFaces = this.mGL.FRONT;
        break;
      case MgStencilFaceFlagBits.FRONT_AND_BACK:
        glFaces = this.mGL.FRONT_AND_BACK;
        break;
      default:
        throw new Error('not supported');
    }

    this.mGL.stencilMaskSeparate(glFaces, mask);
    this.mErrHandler.logGLError("setStencilWriteMask");
  }

  setFrontFaceCullStencilFunction(
    func: MgCompareOp
    , referenceStencil: number
    , compare: number): void {
			this.mGL.stencilFuncSeparate (
				this.mGL.FRONT,
				this.getStencilFunc (func),
				referenceStencil,
				compare);

    this.mErrHandler.logGLError("setFrontFaceCullStencilFunction");
  }

  private getStencilFunc(
    func: MgCompareOp
  ) : number {
    switch (func) {
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
        return this.mGL.ALWAYS;
    }
  }  

  setBackFaceCullStencilFunction( 
      func: MgCompareOp
    , referenceStencil: number
    , compare: number
  ): void {		
    this.mGL.stencilFuncSeparate (
      this.mGL.BACK,
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
    this.mGL.stencilFuncSeparate(
      this.mGL.FRONT_AND_BACK,
      this.getStencilFunc(func),
      referenceStencil,
      compare);

    this.mErrHandler.logGLError("setBothStencilCullStencilFunction");
  }    

  private getStencilOp(
    operation: MgStencilOp
  ) : number {
    switch (operation) {
    case MgStencilOp.KEEP:
      return this.mGL.KEEP;
    case MgStencilOp.DECREMENT_AND_WRAP:
      return this.mGL.DECR_WRAP;
    case MgStencilOp.DECREMENT_AND_CLAMP:
      return this.mGL.DECR;
    case MgStencilOp.INCREMENT_AND_CLAMP:
      return this.mGL.INCR;
    case MgStencilOp.INCREMENT_AND_WRAP:
      return this.mGL.INCR_WRAP;
    case MgStencilOp.INVERT:
      return this.mGL.INVERT;
    case MgStencilOp.REPLACE:
      return this.mGL.REPLACE;
    case MgStencilOp.ZERO:
      return this.mGL.ZERO;
    default:
      return this.mGL.KEEP;
    }
  }

  setFrontFaceStencilOperation(
    stencilFail: MgStencilOp
    , stencilDepthBufferFail: MgStencilOp
    , stencilPass: MgStencilOp
  ): void {			
    this.mGL.stencilOpSeparate(
      this.mGL.FRONT
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
    this.mGL.stencilOpSeparate(
      this.mGL.BACK
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
		this.mGL.stencilFunc(
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
    this.mGL.stencilOp(
      this.getStencilOp(stencilFail)
      , this.getStencilOp(stencilDepthBufferFail)
      , this.getStencilOp(stencilPass)
    );

    this.mErrHandler.logGLError("setStencilOperation");
  }
}