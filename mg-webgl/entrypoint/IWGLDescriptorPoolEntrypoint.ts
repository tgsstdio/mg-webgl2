import {IWGLDescriptorPool}
	from '../IWGLDescriptorPool';	
import {MgDescriptorPoolCreateInfo}
	from '../../mg/MgDescriptorPoolCreateInfo';	

export interface IWGLDescriptorPoolEntrypoint {
	createPool(
		createInfo: MgDescriptorPoolCreateInfo
	) : IWGLDescriptorPool;
}
