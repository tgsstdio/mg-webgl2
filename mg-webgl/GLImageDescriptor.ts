/// <reference path="IGLImageDescriptorEntrypoint.ts" />

namespace Magnesium {
	export class GLImageDescriptor
	{
		private mImgDescriptor: IGLImageDescriptorEntrypoint;		
		constructor (imgDescriptor: IGLImageDescriptorEntrypoint)	{
			this.mImgDescriptor = imgDescriptor;	
		}

		samplerHandle? : number;

		replace (handle: number) : void	{
			this.destroy ();
			this.samplerHandle = handle;
		}

		destroy () : void {
			if (this.samplerHandle)	{
				this.mImgDescriptor.releaseHandle (this.samplerHandle);
				this.samplerHandle = null;
			}
		}
	}
}
