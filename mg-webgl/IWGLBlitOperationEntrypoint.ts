/// <reference path="GLCmdImageInstructionSet.ts" />

namespace Magnesium {
  export interface IWGLBlitOperationEntrypoint {
    initialize() : void;
    copyBuffer(
      src:number
      , dst:number
      , readOffset:number
      , writeOffset: number
      , size:number) : void;
    performOperation(instructionSet: GLCmdImageInstructionSet) : void;
  }
}