import {IWGLBuffer} from '../IWGLBuffer';
import {MgPrimitiveTopology} from '../../mg/MgPrimitiveTopology';
import {MgIndexType} from '../../mg/MgIndexType';

export interface IWGLCmdDrawEntrypoint {
  drawIndexed (
    mode: number
    , elementCount: number
    , elementType: number
    , indexOffset: number
    , instanceCount: number
  ): void;

  drawArraysIndirect (
    mode: number
    , indirect: IWGLBuffer
    , drawCount: number
    , offset: number
    , stride: number) : void;

  drawIndexedIndirect (
    mode: number
    , topology: MgPrimitiveTopology
    , indexType: MgIndexType
    , elementType: number
    , indexByteSize: number
    , indirect: IWGLBuffer
    , drawCount: number
    , offset: number
    , stride: number
  ): void;      

  drawArrays (
    mode: number
    , firstIndex: number
    , indicesCount: number
    , instanceCount: number
  ) : void;
}
