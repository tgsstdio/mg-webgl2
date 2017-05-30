namespace Magnesium {
	export interface IWGLCmdScissorsEntrypoint {
		applyViewports (viewports: WGLCmdViewportParameter): void;
		applyScissors(scissors: WGLCmdScissorParameter): void;
	}
}