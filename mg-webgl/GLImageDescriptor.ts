/// <reference path="./IWGLImageDescriptorEntrypoint.ts" />

namespace Magnesium {
	export class GLImageDescriptor {
		private mImageDescriptor: IWGLImageDescriptorEntrypoint;		
		constructor (imgDescriptor: IWGLImageDescriptorEntrypoint)	{
			this.mImageDescriptor = imgDescriptor;	
		}

		samplerHandle? : WebGLSampler| null;

		replace (handle: WebGLSampler|null) : void	{
			this.destroy ();
			this.samplerHandle = handle;
		}

		destroy () : void {
			if (this.samplerHandle)	{
				this.mImageDescriptor.releaseHandle (this.samplerHandle);
				this.samplerHandle = null;
			}
		}
	}
}
