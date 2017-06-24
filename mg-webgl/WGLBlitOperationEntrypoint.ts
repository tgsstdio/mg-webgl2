import {IWGLBlitOperationEntrypoint}
	from './IWGLBlitOperationEntrypoint';
import {WGLCmdImageInstructionSet}
	from './WGLCmdImageInstructionSet';

export class WGLBlitOperationEntrypoint implements IWGLBlitOperationEntrypoint {
  initialize() : void {

  }

  copyBuffer(
    src:number
    , dst:number
    , readOffset:number
    , writeOffset: number
    , size:number) : void {

  }

  performOperation(instructionSet: WGLCmdImageInstructionSet) : void {

  }
}
