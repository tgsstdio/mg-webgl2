namespace Magnesium {
	export interface IWGLDescriptorPoolEntrypoint {
		createPool(
      createInfo: MgDescriptorPoolCreateInfo
    ) : IWGLDescriptorPool;
	}
}