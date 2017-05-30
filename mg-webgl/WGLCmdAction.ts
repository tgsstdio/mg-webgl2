namespace Magnesium {
  export interface WGLCmdAction {
    action(
      recording: WGLCmdCommandRecording
      , index: number
    ) : void;    
  }
}