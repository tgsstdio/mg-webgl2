import {MgFormat} from './MgFormat'
import {MgSampleCountFlagBits} from './MgSampleCountFlagBits'

export class MgGraphicsDeviceCreateInfo {
	width: number;
	height: number;
	color: MgFormat;
	depthStencil: MgFormat
	samples: MgSampleCountFlagBits
}
