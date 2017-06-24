import {IMgPipeline} from '../mg/IMgPipeline'
import {WGLCmdComputeGrid} from './WGLCmdComputeGrid'

export interface IWGLCmdComputeEncoder {
  dispatch(x: number, y: number, z: number) : void;
  // WARN: offset requires UInt64
  dispatchIndirect(buffer: WebGLBuffer, offset: number) : void;
  bindPipeline(pipeline: IMgPipeline) : void;
  clear(): void;
  asGrid() : WGLCmdComputeGrid;
  endEncoding(): void;
}
