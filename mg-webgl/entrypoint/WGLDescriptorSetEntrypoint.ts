import {IWGLDescriptorSetEntrypoint}
	from './IWGLDescriptorSetEntrypoint';	  
import {MgDescriptorSetAllocateInfo}
	from '../../mg/MgDescriptorSetAllocateInfo';  
import {IMgDescriptorSet}
	from '../../mg/IMgDescriptorSet'; 	
import {MgResult}
	from '../../mg/MgResult';  
import {IWGLDescriptorPool}
	from '../IWGLDescriptorPool';	  
import {WGLDescriptorPoolResourceInfo}
	from '../WGLDescriptorPoolResourceInfo';	    
import {IWGLDescriptorSetLayout}
	from '../IWGLDescriptorSetLayout';	  
import {WGLPoolResourceTicket}
	from '../WGLPoolResourceTicket';
import {MgDescriptorType}
	from '../../mg/MgDescriptorType';  
import {IMgDescriptorPool}
	from '../../mg/IMgDescriptorPool';
import {WGLDescriptorBindingGroup}
	from '../WGLDescriptorBindingGroup';	  
import {IWGLDescriptorSet}
	from '../IWGLDescriptorSet';
import {MgWriteDescriptorSet}
	from '../../mg/MgWriteDescriptorSet';  
import {MgCopyDescriptorSet}
	from '../../mg/MgCopyDescriptorSet'; 		  		  

export class WGLDescriptorSetEntrypoint implements IWGLDescriptorSetEntrypoint {
	allocate(
		pAllocateInfo: MgDescriptorSetAllocateInfo
		, out : { pDescriptorSets: Array<IMgDescriptorSet>|null } 
	) : MgResult {

		if (pAllocateInfo == null) {
			throw new Error('pAllocateInfo is null');
		}

		let parentPool = pAllocateInfo.descriptorPool as IWGLDescriptorPool;

		let highestBinding = 0;
		let sortedResources = new Array<WGLDescriptorPoolResourceInfo>();

		let output = new Array<IMgDescriptorSet>();
		for (let i = 0; i < pAllocateInfo.descriptorSetCount; i += 1)	{
			let bSetLayout = pAllocateInfo.setLayouts[i] as IWGLDescriptorSetLayout;

			sortedResources = new Array<WGLDescriptorPoolResourceInfo>(0);
			for (let uniform of bSetLayout.uniforms) {
				highestBinding = Math.max(highestBinding, uniform.binding);
				
				let ticket: { range: WGLPoolResourceTicket|null } = { range: null };
				switch (uniform.descriptorType)	{						
					case MgDescriptorType.COMBINED_IMAGE_SAMPLER:
						if (
							parentPool.combinedImageSamplers.allocate(
								uniform.descriptorCount
								, ticket)
						)	{
							let info = new WGLDescriptorPoolResourceInfo();
							info.binding = uniform.binding;
							info.descriptorCount = uniform.descriptorCount;
							info.groupType = WGLDescriptorBindingGroup.COMBINED_IMAGE_SAMPLER;
							info.ticket = ticket.range as WGLPoolResourceTicket;
							sortedResources.push(info);
						}
						else {
							// VK_ERROR_FRAGMENTED_POOL = -12
							out.pDescriptorSets = null;
							return MgResult.ERROR_OUT_OF_HOST_MEMORY;
						}
						break;
					case MgDescriptorType.STORAGE_BUFFER:
						if (
							parentPool.storageBuffers.allocate(
								uniform.descriptorCount
								, ticket)
						) {
							let info = new WGLDescriptorPoolResourceInfo();
							info.binding = uniform.binding;
							info.descriptorCount = uniform.descriptorCount;
							info.groupType = WGLDescriptorBindingGroup.STORAGE_BUFFER;
							info.ticket = ticket.range as WGLPoolResourceTicket;
							sortedResources.push(info);
						}
						else {
							// VK_ERROR_FRAGMENTED_POOL = -12
							out.pDescriptorSets = null;
							return MgResult.ERROR_OUT_OF_HOST_MEMORY;
						}
						break;
					case MgDescriptorType.UNIFORM_BUFFER:
						if (
							parentPool.uniformBuffers.allocate(
								uniform.descriptorCount
								, ticket)
						)	{
							let info = new WGLDescriptorPoolResourceInfo();
							info.binding = uniform.binding;
							info.descriptorCount = uniform.descriptorCount;
							info.groupType = WGLDescriptorBindingGroup.UNIFORM_BUFFER;
							info.ticket = ticket.range as WGLPoolResourceTicket;
							sortedResources.push(info);
						}
						else {
								// VK_ERROR_FRAGMENTED_POOL = -12
								out.pDescriptorSets = null;
								return MgResult.ERROR_OUT_OF_HOST_MEMORY;
						}
						break;
				}
			}

			// COUNT 
			let count = highestBinding + 1;

			let resources = new Array<WGLDescriptorPoolResourceInfo>(count);
			for (let res of sortedResources) {
				resources[res.binding] = res;
			}

			let item: { result: IWGLDescriptorSet| null } = { result: null };
			if (parentPool.tryTake(item)) {
				let dSet = item.result as IWGLDescriptorSet;
				dSet.initialize(resources);
				parentPool.allocatedSets.set(dSet.key, dSet);
				output.push(dSet);
			}
			else {
				// TOO MANY DESCRIPTOR SETS FOR POOL
				out.pDescriptorSets = null;
				return MgResult.ERROR_OUT_OF_HOST_MEMORY;
			}
		}

		out.pDescriptorSets = output;                       
		return MgResult.SUCCESS;
	}

	free(
		descriptorPool: IMgDescriptorPool
		, pDescriptorSets: Array<IMgDescriptorSet>
	) : MgResult {
		if (descriptorPool == null) {
			throw new Error('descriptorPool is null');
		}

		if (pDescriptorSets == null) {
			throw new Error('pAllocateInfo is null');
		}      

		let parentPool = descriptorPool as IWGLDescriptorPool

		for (let descSet of pDescriptorSets) {
			let bDescSet = descSet as IWGLDescriptorSet;
			if (bDescSet != null && parentPool === bDescSet.parent)	{
				if (bDescSet.isValidDescriptorSet) {
					for (let resource of bDescSet.resources) {
						parentPool.resetResource(resource);
					}
					bDescSet.invalidate();
					parentPool.allocatedSets.delete(bDescSet.key);
				}
			}
		}

		return MgResult.SUCCESS;
	}

	update(
		pDescriptorWrites: Array<MgWriteDescriptorSet>
		, pDescriptorCopies: Array<MgCopyDescriptorSet>
	) : void {

	}
}
