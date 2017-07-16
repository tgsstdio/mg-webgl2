import {IWGLDeviceImageEntrypoint}
	from './IWGLDeviceImageEntrypoint';	  
import {MgFormat}
	from '../../mg/MgFormat';  
import {IWGLBackbufferContext}
	from '../IWGLBackbufferContext';	

export class WGLDeviceImageEntrypoint implements IWGLDeviceImageEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  constructor(glContext: IWGLBackbufferContext){
    this.mGLContext = glContext;
  }
  
  deleteImage(textureId: WebGLTexture) : void {
    this.mGLContext.gl.deleteTexture(textureId);
  }

  private getInternalFormat(
      format: MgFormat
  ) : number {
    const R8 : number = 0x8229;
    const R16F : number = 0x822D;
    const R32F : number = 0x822E;
    const R8UI : number = 0x8232;
    const RG8 : number = 0x822B;
    const RG16F : number = 0x822F;
    const RG32F : number = 0x8230;
    const RG8UI : number = 0x8238;
    const RGB8 : number = 0x8051;
    const SRGB8 : number = 0x8C41;            
    const RGB565 : number = 0x8D62;
    const R11F_G11F_B10F : number = 0x8C3A;
    const RGB9_E5 : number = 0x8C3D;
    const RGB16F : number = 0x881B; 
    const RGB32F : number = 0x8815;
    const RGB8UI : number = 0x8D7D;
    const RGBA8 : number = 0x8058;
    const SRGB8_ALPHA8 : number = 0x8C43; 
    const RGB5_A1 : number = 0x8057;
    const RGBA4 : number = 0x8056;
    const RGBA16F : number = 0x881A;   
    const RGBA32F : number = 0x8814; 
    const RGBA8UI : number = 0x8D7C;
    const R8_SNORM : number = 0x8F94;
    const R8I : number = 0x8231;
    const R16UI : number = 0x8234;  
    const R16I : number = 0x8233;              

    switch(format) {
      // MDN formats https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext
      case MgFormat.R8_UNORM:
        return R8;
      case MgFormat.R16_SFLOAT:
        return R16F;
      case MgFormat.R32_SFLOAT:
        return R32F;        
      case MgFormat.R8_UINT:
        return R8UI;
      case MgFormat.R8G8_SNORM:
        return RG8;
      case MgFormat.R16G16_SFLOAT:
        return RG16F;
      case MgFormat.R32G32_SFLOAT:
        return RG32F;
      case MgFormat.R8G8_UINT: 
        return RG8UI;
      case MgFormat.R8G8B8_UNORM:
        return RGB8;
      case MgFormat.R8G8B8_SRGB:
        return SRGB8;
      case MgFormat.R5G6B5_UNORM_PACK16:
        return RGB565;
      case MgFormat.B10G11R11_UFLOAT_PACK32:
        return R11F_G11F_B10F;
      case MgFormat.E5B9G9R9_UFLOAT_PACK32:
        return RGB9_E5;
      case MgFormat.R16G16B16_SFLOAT:
        return RGB16F;
      case MgFormat.R32G32B32_SFLOAT:
        return RGB32F;
      case MgFormat.R8G8B8_UINT:
        return RGB8UI;
      case MgFormat.R8G8B8A8_UNORM:
        return RGBA8;
      case MgFormat.A8B8G8R8_SRGB_PACK32:
        return SRGB8_ALPHA8;
      case MgFormat.R5G5B5A1_UNORM_PACK16:
        return RGB5_A1;
      case MgFormat.R4G4B4A4_UNORM_PACK16:
        return RGBA4;
      case MgFormat.R16G16B16A16_SFLOAT:
        return RGBA16F;
      case MgFormat.R32G32B32A32_SFLOAT:
        return RGBA32F;
      case MgFormat.R8G8B8A8_UINT:
        return RGBA8UI;
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
        return R8_SNORM;        
      case MgFormat.R8_SINT:
        return R8I;
      case MgFormat.R16_UINT:
        return R16UI;
      case MgFormat.R16_SINT:
        return R16I;        
      default:
        throw new Error('Not supported');
    }
  }

  createTextureStorage1D (
      levels: number
    , format: MgFormat
    , width: number
  ) : WebGLTexture {
    const TEXTURE_2D: number = 0x0DE1;

    let tex : WebGLTexture | null = this.mGLContext.gl.createTexture();
    this.mGLContext.gl.bindTexture(TEXTURE_2D, tex);
    let internalFormat = this.getInternalFormat(format);
    this.mGLContext.gl.texStorage2D(TEXTURE_2D, levels, internalFormat, width, 1);
    return tex as WebGLTexture;
  }   

  createTextureStorage2D (
      levels: number
    , format: MgFormat
    , width: number
    , height: number
  ) : WebGLTexture {
    const TEXTURE_2D: number = 0x0DE1;

    let tex : WebGLTexture | null = this.mGLContext.gl.createTexture();
    this.mGLContext.gl.bindTexture(TEXTURE_2D, tex);
    let internalFormat = this.getInternalFormat(format);
    this.mGLContext.gl.texStorage2D(TEXTURE_2D, levels, internalFormat, width, height);
    return tex as WebGLTexture;
  }      

  createTextureStorage3D (
      levels: number
    , format: MgFormat
    , width: number
    , height: number
    , depth: number
  ) : WebGLTexture {
    const TEXTURE_3D: number = 0x806F;

    let tex : WebGLTexture | null = this.mGLContext.gl.createTexture();
    this.mGLContext.gl.bindTexture(TEXTURE_3D, tex);
    let internalFormat = this.getInternalFormat(format);
    this.mGLContext.gl.texStorage3D(TEXTURE_3D, levels, internalFormat, width, height, depth);
    return tex as WebGLTexture;
  }          
}
