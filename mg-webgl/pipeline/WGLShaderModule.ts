import {IWGLShaderModule} from './IWGLShaderModule';
import {IMgDevice} from '../../mg/IMgDevice';
import {IMgAllocationCallbacks} from '../../mg/IMgAllocationCallbacks';
import {MgShaderModuleCreateInfo} from '../../mg/MgShaderModuleCreateInfo';

export class WGLShaderModule implements IWGLShaderModule {
  private mCode: string;
  get code(): string {
    return this.mCode;
  }

  private mCodeSize : number;
  get codeSize() : number {
    return this.mCodeSize;
  }
  
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
