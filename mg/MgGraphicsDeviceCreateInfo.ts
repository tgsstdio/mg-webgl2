import {MgFormat} from './MgFormat'
import {MgSampleCountFlagBits} from './MgSampleCountFlagBits'

export class MgGraphicsDeviceCreateInfo {
	constructor() {
		this.color = MgFormat.UNDEFINED;
		this.depthStencil = MgFormat.UNDEFINED;
		this.width = 0;
		this.height = 0;
		this.samples = 0 as MgSampleCountFlagBits;
	}

	width: number;
	height: number;
	color: MgFormat;
	depthStencil: MgFormat
	samples: MgSampleCountFlagBits
}
