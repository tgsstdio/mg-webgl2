import {WGLCmdViewportParameter} from './WGLCmdViewportParameter';
import {WGLCmdScissorParameter} from './WGLCmdScissorParameter';

export interface IWGLCmdScissorsEntrypoint {
	applyViewports (viewports: WGLCmdViewportParameter): void;
	applyScissors(scissors: WGLCmdScissorParameter): void;
}
