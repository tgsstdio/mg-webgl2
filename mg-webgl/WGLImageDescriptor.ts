/// <reference path="./IWGLImageDescriptorEntrypoint.ts" />

namespace Magnesium {
	export class WGLImageDescriptor {
		private mImageDescriptor: IWGLImageDescriptorEntrypoint;		
		constructor (imgDescriptor: IWGLImageDescriptorEntrypoint)	{
			this.mImageDescriptor = imgDescriptor;	
		}

		index: number;
		texture: WebGLTexture|null;
		sampler : WebGLSampler|null;

		destroy () : void {

		}
	}
}