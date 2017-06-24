import {IMgImage} from '../mg/IMgImage';
import {MgFormat} from '../mg/MgFormat';
import {MgImageType} from '../mg/MgImageType';
import {WGLImageArraySubresource} from './WGLImageArraySubresource'

export interface IWGLImage extends IMgImage {
  readonly width: number;
  readonly height: number;
  readonly depth: number;
  readonly format: MgFormat;
  readonly imageType: MgImageType;
  readonly levels: number;
  readonly layers: number;
  readonly arrayLayers: Array<WGLImageArraySubresource>;
}
