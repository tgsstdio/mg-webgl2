namespace Magnesium {
  export interface IWGLDeviceImageEntrypoint {
		deleteImage(
      gl: WebGL2RenderingContext
      , textureId: WebGLTexture) : void;

		createTextureStorage1D (
      gl: WebGL2RenderingContext
      , levels: number
      , format: MgFormat
      , width: number
    ) : WebGLTexture;

		createTextureStorage2D (
      gl: WebGL2RenderingContext
      , levels: number
      , format: MgFormat
      , width: number
      , height: number
    ) : WebGLTexture;

		createTextureStorage3D (
      gl: WebGL2RenderingContext
      , levels: number
      , format: MgFormat
      , width: number
      , height: number
      , depth: number
    ) : WebGLTexture;    
	}
}