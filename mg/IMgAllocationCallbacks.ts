export interface IMgAllocationCallbacks {
  userData: object;
  pfnAllocation(pUserData: object, size: number, alignment: number, allocationScope: number): void;
  pfnReallocation(pUserData: object, pOriginal: object, size:number, alignment: number, allocationScope : number) : void;
  pfnFree(pUserData: object, pMemory: object) : void;
  pfnInternalAllocation(pUserData: object, size:number, allocationType: number, allocationScope: number) : void;
  pfnInternalFree(pUserData: object, size:number, allocationType: number, allocationScope: number) : void;
}
