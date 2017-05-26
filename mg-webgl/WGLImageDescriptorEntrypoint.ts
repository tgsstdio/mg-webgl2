namespace Magnesium {
  export class WGLImageDescriptorEntrypoint implements IWGLImageDescriptorEntrypoint {
		createHandle (textureId: number, samplerId: number) : number
    {
      return 0;
    }
		
    releaseHandle(handle: number): void {

    }
  }
}