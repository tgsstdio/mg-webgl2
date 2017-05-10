/// <reference path="MgResult.ts" />
/// <reference path="IMgQueue.ts" />
/// <reference path="IMgAllocationCallbacks.ts" />
/// <reference path="IMgDeviceMemory.ts" />
/// <reference path="MgMemoryAllocateInfo.ts" />
/// <reference path="MgImageCreateInfo.ts" />

namespace Magnesium {
  export interface IMgDevice {
    destroyDevice(allocator : IMgAllocationCallbacks) : void;
    getDeviceQueue(queueFamilyIndex : number, queueIndex : number, out : {pQueue: IMgQueue} ) : void;
    allocateMemory(pAllocateInfo : MgMemoryAllocateInfo,
      allocator : IMgAllocationCallbacks,
      out : { pMemory : IMgDeviceMemory } ) : MgResult;

		createImage(pCreateInfo : MgImageCreateInfo, allocator : IMgAllocationCallbacks, out: { pImage : IMgImage} ) : MgResult;
		//void DestroyImage(IMgImage image, MgAllocationCallbacks allocator);
		void GetImageSubresourceLayout(IMgImage image, MgImageSubresource pSubresource, out MgSubresourceLayout pLayout);
		Result CreateImageView(MgImageViewCreateInfo pCreateInfo, IMgAllocationCallbacks allocator, out IMgImageView pView);
		//void DestroyImageView(MgImageView imageView, MgAllocationCallbacks allocator);
		Result CreateShaderModule(MgShaderModuleCreateInfo pCreateInfo, IMgAllocationCallbacks allocator, out IMgShaderModule pShaderModule);      
  }
}