export class WGLCmdDepthBiasParameter {
	constructor() {
		this.depthBiasClamp = 0.0;
		this.depthBiasConstantFactor = 0.0;
		this.depthBiasSlopeFactor = 0.0;
	}

	depthBiasSlopeFactor : number;
	depthBiasClamp : number;
	depthBiasConstantFactor : number;    
}
