import {WGLCmdViewportParameter} from '../cmdbuf/WGLCmdViewportParameter';
import {WGLCmdScissorParameter} from '../cmdbuf/WGLCmdScissorParameter';

export interface IWGLCmdScissorsEntrypoint {
	applyViewports (viewports: WGLCmdViewportParameter): void;
	applyScissors(scissors: WGLCmdScissorParameter): void;
}
