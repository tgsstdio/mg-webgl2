import {MgIndexType} from '../mg/MgIndexType';
import {MgPrimitiveTopology} from '../mg/MgPrimitiveTopology';
import {IWGLBuffer} from './IWGLBuffer';

export class WGLCmdInternalDrawIndexedIndirect {
  mode: number;
  topology: MgPrimitiveTopology;
  indexType: MgIndexType;
  elementType: number;
  indexByteSize: number;
  // WARN: indirect requires IntPtr    
  indirect: IWGLBuffer;
  drawCount: number;
  offset: number;
  stride: number;
}
