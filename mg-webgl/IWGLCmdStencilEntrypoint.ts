import {WGLGraphicsPipelineStencilState}
  from './WGLGraphicsPipelineStencilState';
import {WGLQueueRendererStencilState}
  from './WGLQueueRendererStencilState';
import {MgStencilFaceFlagBits} from '../mg/MgStencilFaceFlagBits';
import {MgCompareOp} from '../mg/MgCompareOp'
import {MgStencilOp} from '../mg/MgStencilOp'

export interface IWGLCmdStencilEntrypoint {
  getDefaultEnums(): WGLGraphicsPipelineStencilState;

  initialize(): WGLQueueRendererStencilState;
  enableStencilBuffer(): void;
  disableStencilBuffer(): void;

  setStencilWriteMask(
    face: MgStencilFaceFlagBits
    , mask: number) : void;

  setFrontFaceCullStencilFunction(
    func: MgCompareOp
    , referenceStencil: number
    , compare: number): void;

  setBackFaceCullStencilFunction( 
      func: MgCompareOp
    , referenceStencil: number
    , compare: number): void;

  setBothStencilCullStencilFunction( 
      func: MgCompareOp
    , referenceStencil: number
    , compare: number): void;

  setFrontFaceStencilOperation(
    stencilFail: MgStencilOp
    , stencilDepthBufferFail: MgStencilOp
    , stencilPass: MgStencilOp): void;

  setBackFaceStencilOperation(
    stencilFail: MgStencilOp
    , stencilDepthBufferFail: MgStencilOp
    , stencilPass: MgStencilOp): void;

  setStencilFunction(
    stencilFunction: MgCompareOp
    , referenceStencil: number
    , compare: number): void;

  setStencilOperation(
    stencilFail: MgStencilOp
    ,	stencilDepthBufferFail: MgStencilOp
    ,	stencilPass: MgStencilOp): void;
  }
