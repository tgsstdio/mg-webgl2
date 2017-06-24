import {IWGLDeviceImageEntrypoint}
	from './IWGLDeviceImageEntrypoint';	  
import {MgFormat}
	from '../mg/MgFormat';  

export class WGLDeviceImageEntrypoint implements IWGLDeviceImageEntrypoint {
  private mGL: WebGL2RenderingContext;
  constructor(gl: WebGL2RenderingContext){
    this.mGL = gl;
  }
  
  deleteImage(textureId: WebGLTexture) : void {
    this.mGL.deleteTexture(textureId);
  }

  private getInternalFormat(
      format: MgFormat
  ) : number {
    switch(format) {
      // MDN formats https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext
      case MgFormat.R8_UNORM:
        return this.mGL.R8;
      case MgFormat.R16_SFLOAT:
        return this.mGL.R16F;
      case MgFormat.R32_SFLOAT:
        return this.mGL.R32F;        
      case MgFormat.R8_UINT:
        return this.mGL.R8UI;
      case MgFormat.R8G8_SNORM:
        return this.mGL.RG8;
      case MgFormat.R16G16_SFLOAT:
        return this.mGL.RG16F;
      case MgFormat.R32G32_SFLOAT:
        return this.mGL.RG32F;
      case MgFormat.R8G8_UINT: 
        return this.mGL.RG8UI;
      case MgFormat.R8G8B8_UNORM:
        return this.mGL.RGB8;
      case MgFormat.R8G8B8_SRGB:
        return this.mGL.SRGB8;
      case MgFormat.R5G6B5_UNORM_PACK16:
        return this.mGL.RGB565;
      case MgFormat.B10G11R11_UFLOAT_PACK32:
        return this.mGL.R11F_G11F_B10F;
      case MgFormat.E5B9G9R9_UFLOAT_PACK32:
        return this.mGL.RGB9_E5;
      case MgFormat.R16G16B16_SFLOAT:
        return this.mGL.RGB16F;
      case MgFormat.R32G32B32_SFLOAT:
        return this.mGL.RGB32F;
      case MgFormat.R8G8B8_UINT:
        return this.mGL.RGB8UI;
      case MgFormat.R8G8B8A8_UNORM:
        return this.mGL.RGBA8;
      case MgFormat.A8B8G8R8_SRGB_PACK32:
        return this.mGL.SRGB8_ALPHA8;
      case MgFormat.R5G5B5A1_UNORM_PACK16:
        return this.mGL.RGB5_A1;
      case MgFormat.R4G4B4A4_UNORM_PACK16:
        return this.mGL.RGBA4;
      case MgFormat.R16G16B16A16_SFLOAT:
        return this.mGL.RGBA16F;
      case MgFormat.R32G32B32A32_SFLOAT:
        return this.mGL.RGBA32F;
      case MgFormat.R8G8B8A8_UINT:
        return this.mGL.RGBA8UI;
      // WEBGL_compressed_texture_etc https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc/
      case MgFormat.EAC_R11_UNORM_BLOCK:
        return 0x9270; // COMPRESSED_R11_EAC;
      case MgFormat.EAC_R11_SNORM_BLOCK:
        return 0x9271; // COMPRESSED_SIGNED_R11_EAC;
      case MgFormat.EAC_R11G11_UNORM_BLOCK:
        return 0x9272; // COMPRESSED_RG11_EAC
      case MgFormat.EAC_R11G11_SNORM_BLOCK:
        return 0x9273; // COMPRESSED_SIGNED_RG11_EAC
      case MgFormat.ETC2_R8G8B8_UNORM_BLOCK:
        return 0x9274; // COMPRESSED_RGB8_ETC2
      case MgFormat.ETC2_R8G8B8A8_UNORM_BLOCK:
        return 0x9278; // COMPRESSED_RGBA8_ETC2_EAC
      case MgFormat.ETC2_R8G8B8_SRGB_BLOCK:
        return 0x9275; // COMPRESSED_SRGB8_ETC2                     
      case MgFormat.ETC2_R8G8B8A8_SRGB_BLOCK:
        return 0x9279; // COMPRESSED_SRGB8_ALPHA8_ETC2_EAC
      case MgFormat.ETC2_R8G8B8A1_UNORM_BLOCK:
        return 0x9276; // COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2
      case MgFormat.ETC2_R8G8B8A1_SRGB_BLOCK:
        return 0x9277; // COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2
      // DERIVED FORMAT 
      case MgFormat.R8_SNORM:
        return this.mGL.R8_SNORM;        
      case MgFormat.R8_SINT:
        return this.mGL.R8I;
      case MgFormat.R16_UINT:
        return this.mGL.R16UI;
      case MgFormat.R16_SINT:
        return this.mGL.R16I;  
      default:
        throw new Error('Not supported');
    }
  }

  createTextureStorage1D (
      levels: number
    , format: MgFormat
    , width: number
  ) : WebGLTexture {
    let tex : WebGLTexture | null = this.mGL.createTexture();
    this.mGL.bindTexture(this.mGL.TEXTURE_2D, tex);
    let internalFormat = this.getInternalFormat(format);
    this.mGL.texStorage2D(this.mGL.TEXTURE_2D, levels, internalFormat, width, 1);
    return tex as WebGLTexture;
  }   

  createTextureStorage2D (
      levels: number
    , format: MgFormat
    , width: number
    , height: number
  ) : WebGLTexture {
    let tex : WebGLTexture | null = this.mGL.createTexture();
    this.mGL.bindTexture(this.mGL.TEXTURE_2D, tex);
    let internalFormat = this.getInternalFormat(format);
    this.mGL.texStorage2D(this.mGL.TEXTURE_2D, levels, internalFormat, width, height);
    return tex as WebGLTexture;
  }      

  createTextureStorage3D (
      levels: number
    , format: MgFormat
    , width: number
    , height: number
    , depth: number
  ) : WebGLTexture {
    let tex : WebGLTexture | null = this.mGL.createTexture();
    this.mGL.bindTexture(this.mGL.TEXTURE_3D, tex);
    let internalFormat = this.getInternalFormat(format);
    this.mGL.texStorage3D(this.mGL.TEXTURE_3D, levels, internalFormat, width, height, depth);
    return tex as WebGLTexture;
  }          
}
