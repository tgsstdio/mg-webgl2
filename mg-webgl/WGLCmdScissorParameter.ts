namespace Magnesium {
  export class WGLCmdScissorParameter {
		first: number;
		x: number;
		y: number;
		width: number;
		height: number;

		constructor() {
			this.clear();
		}

		clear(): void {
			this.first = 0;
			this.x = 0;
			this.y = 0;
			this.width = 0;
			this.height = 0;
		}

		equals(other: WGLCmdScissorParameter) : boolean {
			if (Math.abs(this.first - other.first) > Number.EPSILON) {
				return false;
			}

			if (Math.abs(this.x - other.x) > Number.EPSILON) {
				return false;
			}

			if (Math.abs(this.y - other.y) > Number.EPSILON) {
				return false;
			}

			if (Math.abs(this.width - other.width) > Number.EPSILON) {
				return false;							
			}

			return Math.abs(this.height - other.height) <= Number.EPSILON;		
		}		
  }
}