import {MgFormat}
	from '../../mg/MgFormat'; 

export interface IWGLDeviceImageEntrypoint {
  deleteImage(
    textureId: WebGLTexture) : void;

  createTextureStorage1D (
      levels: number
    , format: MgFormat
    , width: number
  ) : WebGLTexture;

  createTextureStorage2D (
      levels: number
    , format: MgFormat
    , width: number
    , height: number
  ) : WebGLTexture;

  createTextureStorage3D (
      levels: number
    , format: MgFormat
    , width: number
    , height: number
    , depth: number
  ) : WebGLTexture;    
}
