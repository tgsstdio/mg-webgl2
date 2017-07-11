import {WGLRasterizerState} from '../pipeline/WGLRasterizerState';

export interface IWGLCmdRasterizationEntrypoint {
	disablePolygonOffset (): void;

	enablePolygonOffset(
		slopeScaleDepthBias: number
		, depthBias:number
	) : void;

	setUsingCounterClockwiseWindings(
		value: boolean): void;

	enableScissorTest(): void;

	disableScissorTest(): void;

	setCullingMode(
		front: boolean
		, back: boolean
	): void;

	enableCulling(): void;

	disableCulling(): void;

	initialize(): WGLRasterizerState;
} 
