import {WGLCmdImageInstructionSet} from './WGLCmdImageInstructionSet'

export interface IWGLBlitOperationEntrypoint {
  initialize() : void;
  copyBuffer(
    src:number
    , dst:number
    , readOffset:number
    , writeOffset: number
    , size:number) : void;
  performOperation(
    instructionSet: WGLCmdImageInstructionSet) : void;
}
