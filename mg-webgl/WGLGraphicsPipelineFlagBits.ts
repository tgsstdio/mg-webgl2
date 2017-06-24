export enum WGLGraphicsPipelineFlagBits {
	// 0 - 7
	Off = 0,
	// DepthStencilBitFlags
	DEPTH_BUFFER_ENABLED = 1,
	DEPTH_BUFFER_WRITE_ENABLED = 2,
	StencilEnabled = 4,
	TwoSidedStencilMode = 8,		
	// BlendStateBitFlags
	BLEND_ENABLED = 16,
	RedColorWriteChannel = 32,
	BlueColorWriteChannel = 64,
	GreenColorWriteChannel = 128,

	// 8 - 15
	AlphaColorWriteChannel = 256,
	// RasterizerStateBitFlags
	USE_COUNTER_CLOCKWISE_WINDINGS = 512,
	CULLING_ENABLED = 1024,
	CULL_BACK_FACES = 2048,
	CULL_FRONT_FACES = 4096,
	SCISSOR_TEST_ENABLED = 8192,
	DepthBiasEnabled = 16384,
	DepthClipEnabled =  32768,

	// 16 - 23
}
