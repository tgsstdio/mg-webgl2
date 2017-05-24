namespace Magnesium {
  export interface IWGLSamplerEntrypoint {
		createSampler() : WebGLSampler;
		deleteSampler (samplerId: WebGLSampler) : void;

		setTextureWrapS (
      samplerId: WebGLSampler
      , addressModeU: MgSamplerAddressMode
    ) : void;

		setTextureWrapT (
      samplerId: WebGLSampler
      , addressModeV: MgSamplerAddressMode): void;

	  setTextureWrapR (
      samplerId: WebGLSampler
      , addressModeW: MgSamplerAddressMode
    ) : void ;

		setTextureMinLod (
      samplerId: WebGLSampler
      , minLod: number) : void;

		setTextureMaxLod (
      samplerId: WebGLSampler
      , maxLod: number) : void;

		setTextureMinFilter (
      samplerId: WebGLSampler
      , minFilter: MgFilter
      , mipmapMode: MgSamplerMipmapMode
    ) : void;

		setTextureMagFilter (
      samplerId: WebGLSampler
      , magFilter: MgFilter
    ) : void;

		setTextureCompareFunc(
      samplerId: WebGLSampler
      , compareOp: MgCompareOp) : void;
  }
}