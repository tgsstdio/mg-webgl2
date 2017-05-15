namespace Magnesium {
	class WebGLContext {

  }
  
  class WebGLTexture {

  }

  export interface IWGLDeviceImageEntrypoint {
		deleteImage(
      gl: WebGLContext
      , textureId: WebGLTexture) : void;

		createTextureStorage1D (
      gl: WebGLContext
      , levels: number
      , format: MgFormat
      , width: number
    ) : number;

		createTextureStorage2D (
      gl: WebGLContext
      , levels: number
      , format: MgFormat
      , width: number
      , height: number
    ) : number;

		createTextureStorage3D (
      gl: WebGLContext
      , levels: number
      , format: MgFormat
      , width: number
      , height: number
      , depth: number
    ) : number;    
	}
}