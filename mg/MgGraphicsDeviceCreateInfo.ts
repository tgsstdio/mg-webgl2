import {MgFormat} from './MgFormat'
import {MgSampleCountFlagBits} from './MgSampleCountFlagBits'
import {MgSelectionMethod} from './MgSelectionMethod'

export class MgGraphicsDeviceCreateInfo {
	constructor() {
		this.color = MgSelectionMethod.SYSTEM;
		this.overrideColor = MgFormat.UNDEFINED;
		this.depthStencil = MgSelectionMethod.SYSTEM;
		this.overrideDepthStencil = MgFormat.UNDEFINED;		
		this.width = 0;
		this.height = 0;
		this.samples = 0 as MgSampleCountFlagBits;
	}

	width: number;
	height: number;
	color: MgSelectionMethod;
	overrideColor: MgFormat;
	depthStencil: MgSelectionMethod
	overrideDepthStencil: MgFormat;
	samples: MgSampleCountFlagBits
}
