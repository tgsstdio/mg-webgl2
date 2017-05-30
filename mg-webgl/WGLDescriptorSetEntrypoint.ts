/// <reference path="./IWGLDescriptorSet.ts" />

namespace Magnesium {
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
			let sortedResources = new Array<GLDescriptorPoolResourceInfo>();

      let output = new Array<IMgDescriptorSet>();
			for (let i = 0; i < pAllocateInfo.descriptorSetCount; i += 1)	{
				let bSetLayout = pAllocateInfo.setLayouts[i] as IWGLDescriptorSetLayout;

				sortedResources = new Array<GLDescriptorPoolResourceInfo>(0);
				for (let uniform of bSetLayout.uniforms) {
					highestBinding = Math.max(highestBinding, uniform.binding);
					
          let ticket: { range: GLPoolResourceTicket|null } = { range: null };
					switch (uniform.descriptorType)	{						
						case MgDescriptorType.COMBINED_IMAGE_SAMPLER:
							if (
								parentPool.combinedImageSamplers.allocate(
									uniform.descriptorCount
									, ticket)
							)	{
								let info = new GLDescriptorPoolResourceInfo();
								info.binding = uniform.binding;
								info.descriptorCount = uniform.descriptorCount;
								info.groupType = GLDescriptorBindingGroup.CombinedImageSampler;
								info.ticket = ticket.range as GLPoolResourceTicket;
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
								let info = new GLDescriptorPoolResourceInfo();
								info.binding = uniform.binding;
								info.descriptorCount = uniform.descriptorCount;
								info.groupType = GLDescriptorBindingGroup.StorageBuffer;
								info.ticket = ticket.range as GLPoolResourceTicket;
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
								let info = new GLDescriptorPoolResourceInfo();
								info.binding = uniform.binding;
								info.descriptorCount = uniform.descriptorCount;
								info.groupType = GLDescriptorBindingGroup.UniformBuffer;
								info.ticket = ticket.range as GLPoolResourceTicket;
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

        let resources = new Array<GLDescriptorPoolResourceInfo>(count);
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
}