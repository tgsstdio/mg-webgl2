import { MgFormat } from '../mg/MgFormat'
import { MgGraphicsDeviceCreateInfo } from '../mg/MgGraphicsDeviceCreateInfo'
import { IWGLBackbufferContext } from './IWGLBackbufferContext'

export class WGLBackbufferContext implements IWGLBackbufferContext {
  private mGL: WebGL2RenderingContext;
  get gl(): WebGL2RenderingContext {
    return this.mGL;
  }

  private mCanvas: HTMLCanvasElement;
  constructor(canvas: HTMLCanvasElement) {    
    this.mCanvas = canvas;    
  }

  private static hasAlpha(format: MgFormat): boolean {
    switch(format) {
	    case MgFormat.R4G4B4A4_UNORM_PACK16:
	    case MgFormat.B4G4R4A4_UNORM_PACK16:
	    case MgFormat.R5G5B5A1_UNORM_PACK16:
	    case MgFormat.B5G5R5A1_UNORM_PACK16:
	    case MgFormat.A1R5G5B5_UNORM_PACK16:
	    case MgFormat.R8G8B8A8_UNORM:
	    case MgFormat.R8G8B8A8_SNORM:
	    case MgFormat.R8G8B8A8_USCALED:
	    case MgFormat.R8G8B8A8_SSCALED:
	    case MgFormat.R8G8B8A8_UINT:
	    case MgFormat.R8G8B8A8_SINT:
	    case MgFormat.R8G8B8A8_SRGB:
	    case MgFormat.B8G8R8A8_UNORM:
	    case MgFormat.B8G8R8A8_SNORM:
	    case MgFormat.B8G8R8A8_USCALED:
	    case MgFormat.B8G8R8A8_SSCALED:
	    case MgFormat.B8G8R8A8_UINT:
	    case MgFormat.B8G8R8A8_SINT:
	    case MgFormat.B8G8R8A8_SRGB:
	    case MgFormat.A8B8G8R8_UNORM_PACK32:
	    case MgFormat.A8B8G8R8_SNORM_PACK32:
	    case MgFormat.A8B8G8R8_USCALED_PACK32:
	    case MgFormat.A8B8G8R8_SSCALED_PACK32:
	    case MgFormat.A8B8G8R8_UINT_PACK32:
	    case MgFormat.A8B8G8R8_SINT_PACK32:
	    case MgFormat.A8B8G8R8_SRGB_PACK32:
	    case MgFormat.A2R10G10B10_UNORM_PACK32:
	    case MgFormat.A2R10G10B10_SNORM_PACK32:
	    case MgFormat.A2R10G10B10_USCALED_PACK32:
	    case MgFormat.A2R10G10B10_SSCALED_PACK32:
	    case MgFormat.A2R10G10B10_UINT_PACK32:
	    case MgFormat.A2R10G10B10_SINT_PACK32:
	    case MgFormat.A2B10G10R10_UNORM_PACK32:
	    case MgFormat.A2B10G10R10_SNORM_PACK32:
	    case MgFormat.A2B10G10R10_USCALED_PACK32:
	    case MgFormat.A2B10G10R10_SSCALED_PACK32:
	    case MgFormat.A2B10G10R10_UINT_PACK32:
	    case MgFormat.A2B10G10R10_SINT_PACK32:
	    case MgFormat.R16G16B16A16_UNORM:
	    case MgFormat.R16G16B16A16_SNORM:
	    case MgFormat.R16G16B16A16_USCALED:
	    case MgFormat.R16G16B16A16_SSCALED:
	    case MgFormat.R16G16B16A16_UINT:
	    case MgFormat.R16G16B16A16_SINT:
	    case MgFormat.R16G16B16A16_SFLOAT:
	    case MgFormat.R32G32B32A32_UINT:
	    case MgFormat.R32G32B32A32_SINT:
	    case MgFormat.R32G32B32A32_SFLOAT:
	    case MgFormat.R64G64B64A64_UINT:
	    case MgFormat.R64G64B64A64_SINT:
	    case MgFormat.R64G64B64A64_SFLOAT:
	    case MgFormat.BC1_RGBA_UNORM_BLOCK:
	    case MgFormat.BC1_RGBA_SRGB_BLOCK:
	    case MgFormat.BC2_UNORM_BLOCK:
	    case MgFormat.BC2_SRGB_BLOCK:
	    case MgFormat.BC3_UNORM_BLOCK:
	    case MgFormat.BC3_SRGB_BLOCK:
	// BC4_UNORM_BLOCK = 139,
	// BC4_SNORM_BLOCK = 140,
	// BC5_UNORM_BLOCK = 141,
	// BC5_SNORM_BLOCK = 142,
	// BC6H_UFLOAT_BLOCK = 143,
	// BC6H_SFLOAT_BLOCK = 144,
	    case MgFormat.BC7_UNORM_BLOCK:
	    case MgFormat.BC7_SRGB_BLOCK:
	    case MgFormat.ETC2_R8G8B8A1_UNORM_BLOCK:
	    case MgFormat.ETC2_R8G8B8A1_SRGB_BLOCK:
	    case MgFormat.ETC2_R8G8B8A8_UNORM_BLOCK:
	    case MgFormat.ETC2_R8G8B8A8_SRGB_BLOCK:
        return true;
      default:
        return false;      
    }
  }

  private static isDepthFormat(format: MgFormat): boolean {
    switch(format) {
      case MgFormat.D16_UNORM:
      case MgFormat.D16_UNORM_S8_UINT:
      case MgFormat.D24_UNORM_S8_UINT:      
      case MgFormat.X8_D24_UNORM_PACK32:
      case MgFormat.D32_SFLOAT:
      case MgFormat.D32_SFLOAT_S8_UINT:
        return true;
      default:
        return false;
    }
  }

  private static isStencilFormat(format: MgFormat): boolean {
    switch(format) {
      case MgFormat.D16_UNORM_S8_UINT:
      case MgFormat.D32_SFLOAT_S8_UINT:
      case MgFormat.S8_UINT:
        return true;
      default:
        return false;
    }
  }

  // for synchronizing 
  initialize(
    colorPassFormat: MgFormat
    , depthPassFormat: MgFormat
    , createInfo: MgGraphicsDeviceCreateInfo
  ): void {
    let hasAlpha = WGLBackbufferContext.hasAlpha(colorPassFormat);
    let isDepth = WGLBackbufferContext.isDepthFormat(depthPassFormat);
    let isStencil = WGLBackbufferContext.isStencilFormat(depthPassFormat);

    let gl = this.mCanvas.getContext(
      'webgl2'
      ,{
        alpha: hasAlpha
        , depth: isDepth
				, stencil: isStencil
				, premultipledAlpha: false
      }
    ) as WebGL2RenderingContext;
    if (gl == null)
      throw new Error('WebGL 2 context missing');

    this.mGL = gl;
  }
}