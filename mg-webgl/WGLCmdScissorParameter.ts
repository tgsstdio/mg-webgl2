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
  }
}