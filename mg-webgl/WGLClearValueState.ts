namespace Magnesium {
	export class WGLClearValueState {
		clearColor: MgColor4f;
		depthValue: number;
		stencilValue: number;

  	equals (
      other: WGLClearValueState
    ): boolean {
			if (this.stencilValue != other.stencilValue) {
				return false;
			}

			if (Math.abs (this.depthValue - other.depthValue) > Number.EPSILON)	{
				return false;
			}

			return this.clearColor.equals (other.clearColor);
		}
	}
}