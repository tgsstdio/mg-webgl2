namespace Magnesium {
	export class WGLBufferEntrypoint implements IWGLBufferEntrypoint {
    createBuffer( 
      createInfo: MgBufferCreateInfo
    ) : IWGLBuffer {
			return new WGLBuffer(createInfo);
		}
	}
}