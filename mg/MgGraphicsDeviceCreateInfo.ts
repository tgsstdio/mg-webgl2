namespace Magnesium {
  export class MgGraphicsDeviceCreateInfo {
		width: number;
		height: number;
		color: MgFormat;
		depthStencil: MgFormat
	  samples: MgSampleCountFlagBits
  }
}