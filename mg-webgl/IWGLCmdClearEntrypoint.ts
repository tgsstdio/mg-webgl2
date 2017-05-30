namespace Magnesium {
	export interface IWGLCmdClearEntrypoint	{
		initialize () : WGLClearValueState;
		clearBuffers(combinedMask: GLQueueClearBufferMask) : void;
		setClearStencilValue(stencil: number): void;
		setClearDepthValue(value: number) : void;
	  setClearColor(clearValue: MgColor4f) : void;
	}
}