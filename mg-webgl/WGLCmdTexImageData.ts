import {MgFormat} from '../mg/MgFormat'
import {MgImageType} from '../mg/MgImageType'

export class WGLCmdTexImageData {
  textureId: number;
  target: MgImageType;
  level: number;
  slice: number;
  width: number;
  height: number;
  depth: number;
  format: MgFormat;
  internalFormat: number;
  pixelFormat: number;
  pixelType: number;
  size: number;
  // WARN : data requires IntPtr
  data: any;
}
