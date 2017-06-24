import {IWGLImageFormatEntrypoint}
	from './IWGLImageFormatEntrypoint';
import {MgFormat}
	from '../mg/MgFormat'; 

export class WGLImageFormatEntrypoint implements  IWGLImageFormatEntrypoint {
  getGLFormat(
    format: MgFormat
    , supportsSRgb: boolean
  ) : number {
    // TODO : fix this stub
    return 0;
  }
}
