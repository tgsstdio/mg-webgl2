/// <reference path="../mg/MgStencilOp.ts" />
/// <reference path="../mg/MgCompareOp.ts" />

namespace Magnesium {
  export class GLGraphicsPipelineStencilState {
    frontStencilFunction: MgCompareOp;
    frontStencilPass: MgStencilOp;
    frontStencilFail: MgStencilOp;
    frontDepthBufferFail: MgStencilOp;
    backStencilFunction: MgCompareOp;
    backStencilPass: MgStencilOp;
    backStencilFail: MgStencilOp;
    backDepthBufferFail: MgStencilOp;

		equals (other: GLGraphicsPipelineStencilState ) : boolean	{
			return this.frontStencilFunction == other.frontStencilFunction
			&& this.frontStencilPass == other.frontStencilPass
			&& this.frontStencilFail == other.frontStencilFail
			&& this.frontDepthBufferFail == other.frontDepthBufferFail
			&& this.backStencilFunction == other.backStencilFunction
			&& this.backStencilPass == other.backStencilPass
			&& this.backStencilFail == other.backStencilFail
			&& this.backDepthBufferFail == other.backDepthBufferFail;
		}

		compareTo (other: GLGraphicsPipelineStencilState ): number {
			if (this.frontStencilFunction < other.frontStencilFunction)
			{
				return -1;
			}
			else if (this.frontStencilFunction > other.frontStencilFunction)
			{
				return 1;
			}

			if (this.frontStencilPass < other.frontStencilPass)
			{
				return -1;
			}
			else if (this.frontStencilPass > other.frontStencilPass)
			{
				return 1;
			}

			if (this.frontStencilFail < other.frontStencilFail)
			{
				return -1;
			}
			else if (this.frontStencilFail > other.frontStencilFail)
			{
				return 1;
			}

			if (this.frontDepthBufferFail < other.frontDepthBufferFail)
			{
				return -1;
			}
			else if (this.frontDepthBufferFail > other.frontDepthBufferFail)
			{
				return 1;
			}

			if (this.backStencilFunction < other.backStencilFunction)
			{
				return -1;
			}
			else if (this.backStencilFunction > other.backStencilFunction)
			{
				return 1;
			}

			if (this.backStencilPass < other.backStencilPass)
			{
				return -1;
			}
			else if (this.backStencilPass > other.backStencilPass)
			{
				return 1;
			}

			if (this.backStencilFail < other.backStencilFail)
			{
				return -1;
			}
			else if (this.backStencilFail > other.backStencilFail)
			{
				return 1;
			}

			if (this.backDepthBufferFail < other.backDepthBufferFail)
			{
				return -1;
			}
			else if (this.backDepthBufferFail > other.backDepthBufferFail)
			{
				return 1;
			}

			return 0;
		}        
  }
}