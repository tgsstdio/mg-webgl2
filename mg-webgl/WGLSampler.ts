/// <reference path="../mg/MgSamplerAddressMode.ts" />

namespace Magnesium {
  export class WGLSampler implements IMgSampler {
    private mEntrypoint: IWGLSamplerEntrypoint;
    private mSampler: WebGLSampler;
    constructor(
      entrypoint: IWGLSamplerEntrypoint
      , pCreateInfo: MgSamplerCreateInfo
    ) {      
      this.mEntrypoint = entrypoint;

      this.mSampler = this.mEntrypoint.createSampler();

      this.populate(pCreateInfo);
    }

		private populate (pCreateInfo: MgSamplerCreateInfo) : void
		{
			// ARB_SAMPLER_OBJECTS
			this.mEntrypoint.setTextureWrapS(
        this.mSampler
        , pCreateInfo.addressModeU);
			//GL.SamplerParameter (this.mSampler, SamplerParameterName.TextureWrapS, (int) GetAddressMode(pCreateInfo.AddressModeU));

			this.mEntrypoint.setTextureWrapT(
        this.mSampler
        , pCreateInfo.addressModeV);
			//GL.SamplerParameter (this.mSampler, SamplerParameterName.TextureWrapT, (int) GetAddressMode(pCreateInfo.AddressModeV));

			this.mEntrypoint.setTextureWrapR(
        this.mSampler
        , pCreateInfo.addressModeW);
			//GL.SamplerParameter (this.mSampler, SamplerParameterName.TextureWrapR, (int) GetAddressMode(pCreateInfo.AddressModeW));

			this.mEntrypoint.setTextureMinLod(
        this.mSampler
        , pCreateInfo.minLod);
			//GL.SamplerParameter (this.mSampler, SamplerParameterName.TextureMinLod, pCreateInfo.MinLod);

			this.mEntrypoint.setTextureMaxLod(
        this.mSampler
        , pCreateInfo.maxLod);
			//GL.SamplerParameter (this.mSampler, SamplerParameterName.TextureMaxLod, pCreateInfo.MaxLod);

			this.mEntrypoint.setTextureMinFilter(
        this.mSampler
        , pCreateInfo.minFilter
        , pCreateInfo.mipmapMode);
			//GL.SamplerParameter (this.mSampler, SamplerParameterName.TextureMinFilter, (int) GetMinFilterValue(pCreateInfo.MinFilter, pCreateInfo.MipmapMode));

			this.mEntrypoint.setTextureMagFilter(
        this.mSampler
        , pCreateInfo.magFilter);
			//GL.SamplerParameter (this.mSampler, SamplerParameterName.TextureMagFilter, (int) GetMagFilterValue(pCreateInfo.MagFilter));

			this.mEntrypoint.setTextureCompareFunc(
        this.mSampler
        , pCreateInfo.compareOp);
			//GL.SamplerParameter (this.mSampler, SamplerParameterName.TextureCompareFunc, (int) GetCompareOp(pCreateInfo.CompareOp) );

			// EXT_texture_filter_anisotropic
			//GL.SamplerParameter (this.mSampler, SamplerParameterName.TextureMaxAnisotropyExt, pCreateInfo.MaxAnisotropy);
		}

    private mIsDisposed: boolean = false;
		destroySampler (device: IMgDevice
      , allocator: IMgAllocationCallbacks|null
    ) : void {
      if (!this.mIsDisposed) {
        this.mEntrypoint.deleteSampler(this.mSampler);        

        this.mIsDisposed = true;
      }
    }
  }
}