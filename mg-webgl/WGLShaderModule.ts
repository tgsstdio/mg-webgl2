namespace Magnesium {
  export class WGLShaderModule implements IMgShaderModule {
    private mCode: string;
    private mCodeSize : number;
    constructor(pCreateInfo: MgShaderModuleCreateInfo) {
      if (pCreateInfo == null) {
        throw new Error('pCreateInfo is null');
      }

      this.mCode = pCreateInfo.code;
      this.mCodeSize = pCreateInfo.codeSize;
    }

		destroyShaderModule(
      device : IMgDevice
      , allocator : IMgAllocationCallbacks|null
    ) : void {

    }
  }
}