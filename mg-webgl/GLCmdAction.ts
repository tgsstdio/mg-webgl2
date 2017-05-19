namespace Magnesium {
  export interface WGLCmdAction {
    action(
      recording: GLCmdCommandRecording
      , index: number
    ) : void;    
  }
}