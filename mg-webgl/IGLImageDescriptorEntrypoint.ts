namespace Magnesium {
	export interface IGLImageDescriptorEntrypoint	{
		createHandle (textureId: number, samplerId: number) : number;
		releaseHandle(handle: number): void;
	}
}