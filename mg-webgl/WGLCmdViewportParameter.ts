export class WGLCmdViewportParameter {
	first: number;
	x: number;
	y: number;
	width: number;
	height: number;
	zNear: number;
	zFar: number;

	constructor() {
		this.clear();
	}

	clear(): void {
		this.first = 0;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.zNear = 0;
		this.zFar = 0;
	}

	equals(other: WGLCmdViewportParameter) : boolean {
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

		if (Math.abs(this.height - other.height) > Number.EPSILON) {
			return false;							
		}

		if (Math.abs(this.zNear - other.zNear) > Number.EPSILON) {
			return false;							
		}				

		return Math.abs(this.zFar - other.zFar) <= Number.EPSILON;				
	}
}
