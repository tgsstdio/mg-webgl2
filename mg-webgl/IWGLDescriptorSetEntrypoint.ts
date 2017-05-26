namespace Magnesium {
  export interface IWGLDescriptorSetEntrypoint {
    allocate(
      pAllocateInfo: MgDescriptorSetAllocateInfo
      , out : { pDescriptorSets: Array<IMgDescriptorSet>|null } 
    ) : MgResult;

		free(
      descriptorPool: IMgDescriptorPool
      , pDescriptorSets: Array<IMgDescriptorSet>
    ) : MgResult;

    update(
      pDescriptorWrites: Array<MgWriteDescriptorSet>|null
      , pDescriptorCopies: Array<MgCopyDescriptorSet>|null
    ) : void;
  }
}