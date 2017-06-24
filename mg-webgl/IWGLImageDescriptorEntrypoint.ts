export interface IWGLImageDescriptorEntrypoint	{
	createHandle (textureId: number, samplerId: number) : number;
	releaseHandle(handle: number): void;
}
