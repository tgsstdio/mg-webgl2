namespace Magnesium {
  export class WGLDeviceImageEntrypoint implements IWGLDeviceImageEntrypoint {
   		deleteImage(
        gl: WebGL2RenderingContext
        , textureId: WebGLTexture
      ) : void {
        gl.deleteTexture(textureId);
      }

    private getInternalFormat(
       gl: WebGL2RenderingContext
       ,format: MgFormat
    ) : number {
      switch(format) {
        // MDN formats https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext
        case MgFormat.R8_UNORM:
          return gl.R8;
        case MgFormat.R16_SFLOAT:
          return gl.R16F;
        case MgFormat.R32_SFLOAT:
          return gl.R32F;        
        case MgFormat.R8_UINT:
          return gl.R8UI;
        case MgFormat.R8G8_SNORM:
          return gl.RG8;
        case MgFormat.R16G16_SFLOAT:
          return gl.RG16F;
        case MgFormat.R32G32_SFLOAT:
          return gl.RG32F;
        case MgFormat.R8G8_UINT: 
          return gl.RG8UI;
        case MgFormat.R8G8B8_UNORM:
          return gl.RGB8;
        case MgFormat.R8G8B8_SRGB:
          return gl.SRGB8;
        case MgFormat.R5G6B5_UNORM_PACK16:
          return gl.RGB565;
        case MgFormat.B10G11R11_UFLOAT_PACK32:
          return gl.R11F_G11F_B10F;
        case MgFormat.E5B9G9R9_UFLOAT_PACK32:
          return gl.RGB9_E5;
        case MgFormat.R16G16B16_SFLOAT:
          return gl.RGB16F;
        case MgFormat.R32G32B32_SFLOAT:
          return gl.RGB32F;
        case MgFormat.R8G8B8_UINT:
          return gl.RGB8UI;
        case MgFormat.R8G8B8A8_UNORM:
          return gl.RGBA8;
        case MgFormat.A8B8G8R8_SRGB_PACK32:
          return gl.SRGB8_ALPHA8;
        case MgFormat.R5G5B5A1_UNORM_PACK16:
          return gl.RGB5_A1;
        case MgFormat.R4G4B4A4_UNORM_PACK16:
          return gl.RGBA4;
        case MgFormat.R16G16B16A16_SFLOAT:
          return gl.RGBA16F;
        case MgFormat.R32G32B32A32_SFLOAT:
          return gl.RGBA32F;
        case MgFormat.R8G8B8A8_UINT:
          return gl.RGBA8UI;
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
          return gl.R8_SNORM;        
        case MgFormat.R8_SINT:
          return gl.R8I;
        case MgFormat.R16_UINT:
          return gl.R16UI;
        case MgFormat.R16_SINT:
          return gl.R16I;  
        default:
          throw new Error('Not supported');
      }
    }

		createTextureStorage1D (
      gl: WebGL2RenderingContext
      , levels: number
      , format: MgFormat
      , width: number
    ) : WebGLTexture {
      let tex : WebGLTexture | null = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      let internalFormat = this.getInternalFormat(gl, format);
      gl.texStorage2D(gl.TEXTURE_2D, levels, internalFormat, width, 1);
      return tex as WebGLTexture;
    }   

		createTextureStorage2D (
      gl: WebGL2RenderingContext
      , levels: number
      , format: MgFormat
      , width: number
      , height: number
    ) : WebGLTexture {
      let tex : WebGLTexture | null = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      let internalFormat = this.getInternalFormat(gl, format);
      gl.texStorage2D(gl.TEXTURE_2D, levels, internalFormat, width, height);
      return tex as WebGLTexture;
    }      

		createTextureStorage3D (
      gl: WebGL2RenderingContext
      , levels: number
      , format: MgFormat
      , width: number
      , height: number
      , depth: number
    ) : WebGLTexture {
      let tex : WebGLTexture | null = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_3D, tex);
      let internalFormat = this.getInternalFormat(gl, format);
      gl.texStorage3D(gl.TEXTURE_3D, levels, internalFormat, width, height, depth);
      return tex as WebGLTexture;
    }          
  }
}