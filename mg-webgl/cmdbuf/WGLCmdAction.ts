import {WGLCmdCommandRecording} from './WGLCmdCommandRecording'

export interface WGLCmdAction {
  action(
    recording: WGLCmdCommandRecording
    , index: number
  ) : void;    
}
