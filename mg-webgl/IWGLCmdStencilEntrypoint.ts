namespace Magnesium {
	export interface IWGLCmdStencilEntrypoint {
		getDefaultEnums(): GLGraphicsPipelineStencilState;

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
}