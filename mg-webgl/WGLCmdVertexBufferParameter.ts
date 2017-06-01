namespace Magnesium {
	export class WGLCmdVertexBufferParameter
	{
    // WARN : pOffsets must be ulong
		pOffsets: Array<number>|null;
		pBuffers: Array<IMgBuffer>;
		firstBinding: number;
	}
}