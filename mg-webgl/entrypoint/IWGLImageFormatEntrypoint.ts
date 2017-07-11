import {MgFormat} from '../../mg/MgFormat';

export interface IWGLImageFormatEntrypoint {
  getGLFormat(
    format: MgFormat
    , supportsSRgb: boolean
  ) : number;
}
