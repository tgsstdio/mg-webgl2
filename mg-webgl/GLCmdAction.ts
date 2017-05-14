namespace Magnesium {
  export interface GLCmdAction {
    action(
      recording: GLCmdCommandRecording
      , index: number
    ) : void;    
  }
}