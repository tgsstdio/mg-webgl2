import {WGLClearValueState} from './WGLClearValueState'
import {WGLQueueClearBufferMask} from './WGLQueueClearBufferMask'
import {MgColor4f} from '../mg/MgColor4f'

export interface IWGLCmdClearEntrypoint	{
	initialize () : WGLClearValueState;
	clearBuffers(combinedMask: WGLQueueClearBufferMask) : void;
	setClearStencilValue(stencil: number): void;
	setClearDepthValue(value: number) : void;
	setClearColor(clearValue: MgColor4f) : void;
}
