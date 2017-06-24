import {IWGLSamplerEntrypoint} from './IWGLSamplerEntrypoint';
import {IWGLErrorHandler} from './IWGLErrorHandler';
import {MgSamplerAddressMode} from '../mg/MgSamplerAddressMode';
import {MgFilter} from '../mg/MgFilter';
import {MgSamplerMipmapMode} from '../mg/MgSamplerMipmapMode';
import {MgCompareOp} from '../mg/MgCompareOp';

export class WGLSamplerEntrypoint implements IWGLSamplerEntrypoint {
  private mGL: WebGL2RenderingContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    gl: WebGL2RenderingContext
    , errHandler: IWGLErrorHandler
  )
  {
    this.mGL = gl;
    this.mErrHandler = errHandler;
  }

  createSampler() : WebGLSampler {
    return this.mGL.createSampler() as WebGLSampler;
  }

  deleteSampler (samplerId: WebGLSampler): void	{
    this.mGL.deleteSampler(samplerId);
  }    

  setTextureWrapS (
    samplerId: WebGLSampler
    , addressModeU: MgSamplerAddressMode
  ) : void
  {
    this.mGL.samplerParameteri (
      samplerId
      , this.mGL.TEXTURE_WRAP_S
      , this.getAddressMode(addressModeU)
    );
    this.mErrHandler.logGLError ("SamplerParameter (TextureWrapS)");
  }    

  setTextureWrapT (
    samplerId: WebGLSampler
    , addressModeV: MgSamplerAddressMode
  ) : void {
    this.mGL.samplerParameteri (
      samplerId
      , this.mGL.TEXTURE_WRAP_T
      , this.getAddressMode(addressModeV)
    );
    this.mErrHandler.logGLError ("SamplerParameter (TextureWrapT)");
  } 

  setTextureWrapR (
    samplerId: WebGLSampler
    , addressModeR: MgSamplerAddressMode
  ) : void {
    this.mGL.samplerParameteri (
      samplerId
      , this.mGL.TEXTURE_WRAP_R
      , this.getAddressMode(addressModeR)
      );
    this.mErrHandler.logGLError ("SamplerParameter (TextureWrapR)");
  }

  setTextureMinLod (
    samplerId: WebGLSampler
    , minLod: number
  ) : void {
    this.mGL.samplerParameterf (
      samplerId
      , this.mGL.TEXTURE_MIN_LOD
      , minLod);
    this.mErrHandler.logGLError("SamplerParameter (TextureMinLod)");
  }

  setTextureMaxLod (
    samplerId: WebGLSampler
    , maxLod: number
  ) : void {
    this.mGL.samplerParameterf (
      samplerId
      , this.mGL.TEXTURE_MAX_LOD
      , maxLod);
    this.mErrHandler.logGLError ("SamplerParameter (TextureMaxLod)");
  }

  setTextureMinFilter(
    samplerId: WebGLSampler
    , minFilter: MgFilter
    , mipmapMode: MgSamplerMipmapMode
  ) : void {
    this.mGL.samplerParameteri (
      samplerId
      , this.mGL.TEXTURE_MIN_FILTER
      , this.getMinFilterValue(minFilter, mipmapMode));
    this.mErrHandler.logGLError ("SamplerParameter (TextureMinFilter)");
  }

  private getMinFilterValue(
    filter: MgFilter
    , mode: MgSamplerMipmapMode
  ) : number {
    switch (filter)
    {
    case MgFilter.LINEAR:
      return (mode == MgSamplerMipmapMode.LINEAR)
          ? this.mGL.LINEAR_MIPMAP_LINEAR
          : this.mGL.LINEAR;
    case MgFilter.NEAREST:
      return (mode == MgSamplerMipmapMode.LINEAR)
        ? this.mGL.NEAREST_MIPMAP_LINEAR
        : this.mGL.NEAREST;
    default:
      throw new Error('getMinFilterValue - filter not supported');
    }
  }       

  private getMagFilterValue(filter: MgFilter) : number
  {
    switch (filter)
    {
    case MgFilter.LINEAR:
      return this.mGL.LINEAR;
    case MgFilter.NEAREST:
      return this.mGL.NEAREST;
    default:
      throw new Error('GetMagFilterValue - filter not supported');
    }
  }    

  setTextureMagFilter (
    samplerId: WebGLSampler
    , magFilter: MgFilter
  )	: void {
    this.mGL.samplerParameteri (
      samplerId
    , this.mGL.TEXTURE_MAG_FILTER
    , this.getMagFilterValue(magFilter));
    this.mErrHandler.logGLError ("SamplerParameter (TextureMagFilter)");
  }

  setTextureCompareFunc (
    samplerId: WebGLSampler
    , compareOp: MgCompareOp) 
  {
    this.mGL.samplerParameteri (
      samplerId
      , this.mGL.TEXTURE_COMPARE_FUNC
      , this.getCompareOp(compareOp) );
    this.mErrHandler.logGLError ("SamplerParameter (TextureCompareFunc)");
  }

  private getCompareOp (
    compareOp: MgCompareOp
  ) : number {
    switch (compareOp) {
    case MgCompareOp.ALWAYS:
      return this.mGL.ALWAYS;
    case MgCompareOp.EQUAL:
      return this.mGL.EQUAL;      
    case MgCompareOp.LESS:
      return this.mGL.LESS;
    case MgCompareOp.LESS_OR_EQUAL:
      return this.mGL.LEQUAL;
    case MgCompareOp.GREATER:
      return this.mGL.GREATER;      
    case MgCompareOp.GREATER_OR_EQUAL:
      return this.mGL.GEQUAL;        
    case MgCompareOp.NOT_EQUAL:
      return this.mGL.NOTEQUAL;        
    case MgCompareOp.NEVER:
      return this.mGL.NEVER;       
    default:
      throw new Error('getCompareOp - compareOp not supported');
    }
  }

  private getAddressMode(mode: MgSamplerAddressMode) : number
  {
    switch (mode)
    {
      // case MgSamplerAddressMode.CLAMP_TO_BORDER:
      // 	return this.mGL.CLAMP_ All.ClampToBorder;
      case MgSamplerAddressMode.CLAMP_TO_EDGE:
        return this.mGL.CLAMP_TO_EDGE;
      case MgSamplerAddressMode.MIRRORED_REPEAT:
        return this.mGL.MIRRORED_REPEAT;
        // EXT ARB_texture_mirror_clamp_to_edge
      // case MgSamplerAddressMode.MIRROR_CLAMP_TO_EDGE:
      // 	return All.MirrorClampToEdge;
      case MgSamplerAddressMode.REPEAT:
        return this.mGL.REPEAT;
      default:
        throw new Error('getAddressMode - mode not supported');
    }
  }
}


