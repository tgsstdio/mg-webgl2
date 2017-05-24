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
					
          GLPoolResourceTicket ticket;
					switch (uniform.descriptorType)	{
						case MgDescriptorType.COMBINED_IMAGE_SAMPLER:
							if (parentPool.combinedImageSamplers.allocate(uniform.descriptorCount, out ticket))	{

								let info = new GLDescriptorPoolResourceInfo();
								info.binding = uniform.binding;
								info.descriptorCount = uniform.descriptorCount;
								info.groupType = GLDescriptorBindingGroup.CombinedImageSampler;
								info.ticket = ticket;
								sortedResources.push(info);
							}
							else {
								// VK_ERROR_FRAGMENTED_POOL = -12
								out.pDescriptorSets = null;
								return MgResult.ERROR_OUT_OF_HOST_MEMORY;
							}
							break;
						case MgDescriptorType.STORAGE_BUFFER:
							if (parentPool.StorageBuffers.Allocate(uniform.DescriptorCount, out ticket))
							{
								sortedResources.push(
									new GLDescriptorPoolResourceInfo
									{
									Binding = uniform.Binding,
									DescriptorCount = uniform.DescriptorCount,
									GroupType = GLDescriptorBindingGroup.StorageBuffer,
									Ticket = ticket,
									}
								);
							}
							else {
								// VK_ERROR_FRAGMENTED_POOL = -12
								out.pDescriptorSets = null;
								return MgResult.ERROR_OUT_OF_HOST_MEMORY;
							}
							break;
						case MgDescriptorType.UNIFORM_BUFFER:
							if (parentPool.UniformBuffers.Allocate(uniform.DescriptorCount, out ticket))
							{
								sortedResources.Add(
									new GLDescriptorPoolResourceInfo
									{
									Binding = uniform.Binding,
									DescriptorCount = uniform.DescriptorCount,
									GroupType = GLDescriptorBindingGroup.UniformBuffer,
									Ticket = ticket,
									}
								);
							}
							else
							{
                                // VK_ERROR_FRAGMENTED_POOL = -12
                                pDescriptorSets = null;
                                return Result.ERROR_OUT_OF_HOST_MEMORY;
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

				IWGLDescriptorSet item;
        if (parentPool.TryTake(out item)) {
          item.Initialize(resources);
          parentPool.AllocatedSets.Add(item.Key, item);
          output.Add(item);
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

      let parentPool = descriptorPool as IGLNextDescriptorPool

			for (let descSet of pDescriptorSets)
			{
				var bDescSet = descSet as IGLDescriptorSet;
				if (bDescSet != null && parentPool === bDescSet.parent)
				{
					if (bDescSet.isValidDescriptorSet())
					{
						for (var resource of bDescSet.resources)
						{
							parentPool.resetResource(resource);
						}
						bDescSet.invalidate();
						parentPool.allocatedSets.remove(bDescSet.key);
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