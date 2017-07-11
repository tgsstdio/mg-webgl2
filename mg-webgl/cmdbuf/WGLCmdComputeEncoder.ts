import {IWGLCmdComputeEncoder}
	from './IWGLCmdComputeEncoder';	
import {WGLCmdComputeGrid}
	from './WGLCmdComputeGrid';	
import {IMgPipeline}
	from '../../mg/IMgPipeline';  

export class WGLCmdComputeEncoder implements IWGLCmdComputeEncoder {
  dispatch(x: number, y: number, z: number) : never {
    throw new Error('Not implemented');
  }

  // WARN: offset requires UInt64
  dispatchIndirect(buffer: WebGLBuffer, offset: number) : never {
    throw new Error('Not implemented');
  }

  bindPipeline(pipeline: IMgPipeline) : never {
    throw new Error('Not implemented');
  }
  clear(): void {

  }

  asGrid() : WGLCmdComputeGrid {
    return new WGLCmdComputeGrid();
  }

  endEncoding(): void {

  }
}