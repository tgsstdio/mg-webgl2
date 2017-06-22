import { MgFilter } from './MgFilter'
import { MgSamplerMipmapMode } from './MgSamplerMipmapMode'
import { MgSamplerAddressMode } from './MgSamplerAddressMode'
import { MgCompareOp } from './MgCompareOp'
import { MgBorderColor } from './MgBorderColor'

export class MgSamplerCreateInfo {
  flags : number;
  magFilter : MgFilter;
  minFilter : MgFilter;
  mipmapMode : MgSamplerMipmapMode;
  addressModeU : MgSamplerAddressMode;
  addressModeV : MgSamplerAddressMode;
  addressModeW : MgSamplerAddressMode;
  mipLodBias : number;
  anisotropyEnable : boolean;
  maxAnisotropy : number;
  compareEnable : boolean;
  compareOp : MgCompareOp;
  minLod : number;
  maxLod : number;
  borderColor : MgBorderColor;
  unnormalizedCoordinates : boolean;
}
