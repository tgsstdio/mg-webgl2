import {IWGLSamplerEntrypoint} from './IWGLSamplerEntrypoint';
import {IWGLErrorHandler} from './IWGLErrorHandler';
import {MgSamplerAddressMode} from '../../mg/MgSamplerAddressMode';
import {MgFilter} from '../../mg/MgFilter';
import {MgSamplerMipmapMode} from '../../mg/MgSamplerMipmapMode';
import {MgCompareOp} from '../../mg/MgCompareOp';
import {IWGLBackbufferContext} from '../IWGLBackbufferContext';

export class WGLSamplerEntrypoint implements IWGLSamplerEntrypoint {
  private mGLContext: IWGLBackbufferContext;
  private mErrHandler: IWGLErrorHandler;
  constructor(
    glContext: IWGLBackbufferContext
    , errHandler: IWGLErrorHandler
  )
  {
    this.mGLContext = glContext;
    this.mErrHandler = errHandler;
  }

  createSampler() : WebGLSampler {
    return this.mGLContext.gl.createSampler() as WebGLSampler;
  }

  deleteSampler (samplerId: WebGLSampler): void	{
    this.mGLContext.gl.deleteSampler(samplerId);
  }    

  setTextureWrapS (
    samplerId: WebGLSampler
    , addressModeU: MgSamplerAddressMode
  ) : void
  {
    const TEXTURE_WRAP_S: number = 0x2802;
    this.mGLContext.gl.samplerParameteri (
      samplerId
      , TEXTURE_WRAP_S
      , this.getAddressMode(addressModeU)
    );
    this.mErrHandler.logGLError ("SamplerParameter (TextureWrapS)");
  }    

  setTextureWrapT (
    samplerId: WebGLSampler
    , addressModeV: MgSamplerAddressMode
  ) : void {
    const TEXTURE_WRAP_T: number = 0x2803;

    this.mGLContext.gl.samplerParameteri (
      samplerId
      , TEXTURE_WRAP_T
      , this.getAddressMode(addressModeV)
    );
    this.mErrHandler.logGLError ("SamplerParameter (TextureWrapT)");
  } 

  setTextureWrapR (
    samplerId: WebGLSampler
    , addressModeR: MgSamplerAddressMode
  ) : void {
    const TEXTURE_WRAP_R: number = 0x8072;

    this.mGLContext.gl.samplerParameteri (
      samplerId
      , TEXTURE_WRAP_R
      , this.getAddressMode(addressModeR)
      );
    this.mErrHandler.logGLError ("SamplerParameter (TextureWrapR)");
  }

  setTextureMinLod (
    samplerId: WebGLSampler
    , minLod: number
  ) : void {
    const TEXTURE_MIN_LOD: number = 0x813A;

    this.mGLContext.gl.samplerParameterf (
      samplerId
      , TEXTURE_MIN_LOD
      , minLod);
    this.mErrHandler.logGLError("SamplerParameter (TextureMinLod)");
  }

  setTextureMaxLod (
    samplerId: WebGLSampler
    , maxLod: number
  ) : void {
    const TEXTURE_MAX_LOD: number = 0x813B;

    this.mGLContext.gl.samplerParameterf (
      samplerId
      , TEXTURE_MAX_LOD
      , maxLod);
    this.mErrHandler.logGLError ("SamplerParameter (TextureMaxLod)");
  }

  setTextureMinFilter(
    samplerId: WebGLSampler
    , minFilter: MgFilter
    , mipmapMode: MgSamplerMipmapMode
  ) : void {
    const TEXTURE_MIN_FILTER: number = 0x2801;

    this.mGLContext.gl.samplerParameteri (
      samplerId
      , TEXTURE_MIN_FILTER
      , this.getMinFilterValue(minFilter, mipmapMode));
    this.mErrHandler.logGLError ("SamplerParameter (TextureMinFilter)");
  }

  private getMinFilterValue(
    filter: MgFilter
    , mode: MgSamplerMipmapMode
  ) : number {
    const LINEAR_MIPMAP_LINEAR: number = 0x2703;
    const LINEAR: number = 0x2601;
    const NEAREST_MIPMAP_LINEAR: number = 0x2702;
    const NEAREST: number = 0x2600;    


    switch (filter) {
      case MgFilter.LINEAR:
        return (mode == MgSamplerMipmapMode.LINEAR)
            ? LINEAR_MIPMAP_LINEAR
            : LINEAR;
      case MgFilter.NEAREST:
        return (mode == MgSamplerMipmapMode.LINEAR)
          ? NEAREST_MIPMAP_LINEAR
          : NEAREST;
      default:
        throw new Error('getMinFilterValue - filter not supported');
    }
  }       

  private getMagFilterValue(filter: MgFilter) : number
  {
    const LINEAR: number = 0x2601;
    const NEAREST: number = 0x2600;  

    switch (filter) {
      case MgFilter.LINEAR:
        return LINEAR;
      case MgFilter.NEAREST:
        return NEAREST;
      default:
        throw new Error('GetMagFilterValue - filter not supported');
    }
  }    

  setTextureMagFilter (
    samplerId: WebGLSampler
    , magFilter: MgFilter
  )	: void {
    const TEXTURE_MAG_FILTER: number = 0x2800; 

    this.mGLContext.gl.samplerParameteri (
      samplerId
    , TEXTURE_MAG_FILTER
    , this.getMagFilterValue(magFilter));
    this.mErrHandler.logGLError ("SamplerParameter (TextureMagFilter)");
  }

  setTextureCompareFunc (
    samplerId: WebGLSampler
    , compareOp: MgCompareOp) 
  {
    const TEXTURE_COMPARE_FUNC: number = 0x884D; 

    this.mGLContext.gl.samplerParameteri (
      samplerId
      , TEXTURE_COMPARE_FUNC
      , this.getCompareOp(compareOp) );
    this.mErrHandler.logGLError ("SamplerParameter (TextureCompareFunc)");
  }

  private getCompareOp (
    compareOp: MgCompareOp
  ) : number {
    const NEVER: number = 0x0200;
    const LESS: number = 0x0201;
    const EQUAL: number = 0x0202;
    const LEQUAL: number = 0x0203;
    const GREATER: number = 0x0204;
    const NOTEQUAL: number = 0x0205;
    const GEQUAL: number = 0x0206;
    const ALWAYS: number = 0x0207;

    switch (compareOp) {
    case MgCompareOp.ALWAYS:
      return ALWAYS;
    case MgCompareOp.EQUAL:
      return EQUAL;      
    case MgCompareOp.LESS:
      return LESS;
    case MgCompareOp.LESS_OR_EQUAL:
      return LEQUAL;
    case MgCompareOp.GREATER:
      return GREATER;      
    case MgCompareOp.GREATER_OR_EQUAL:
      return GEQUAL;        
    case MgCompareOp.NOT_EQUAL:
      return NOTEQUAL;        
    case MgCompareOp.NEVER:
      return NEVER;       
    default:
      throw new Error('getCompareOp - compareOp not supported');
    }
  }

  private getAddressMode(mode: MgSamplerAddressMode) : number
  {
    const CLAMP_TO_EDGE: number = 0x812F;
    const MIRRORED_REPEAT: number = 0x8370;
    const REPEAT: number = 0x2901;

    switch (mode)
    {
      // case MgSamplerAddressMode.CLAMP_TO_BORDER:
      // 	return this.mGL.CLAMP_ All.ClampToBorder;
      case MgSamplerAddressMode.CLAMP_TO_EDGE:
        return CLAMP_TO_EDGE;
      case MgSamplerAddressMode.MIRRORED_REPEAT:
        return MIRRORED_REPEAT;
        // EXT ARB_texture_mirror_clamp_to_edge
      // case MgSamplerAddressMode.MIRROR_CLAMP_TO_EDGE:
      // 	return All.MirrorClampToEdge;
      case MgSamplerAddressMode.REPEAT:
        return REPEAT;
      default:
        throw new Error('getAddressMode - mode not supported');
    }
  }
}


