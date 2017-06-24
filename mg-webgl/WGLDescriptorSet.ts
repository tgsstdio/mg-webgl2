import {IWGLDescriptorSet}
from './IWGLDescriptorSet';	  
import {IWGLDescriptorPool}
from './IWGLDescriptorPool';	  
import {WGLDescriptorPoolResourceInfo}
	from './WGLDescriptorPoolResourceInfo';	  

export class WGLDescriptorSet
  implements IWGLDescriptorSet {

  private mKey : number;
  get key(): number {
    return this.mKey;
  }

  private mParent: IWGLDescriptorPool|null;
  get parent(): IWGLDescriptorPool|null {
    return this.mParent;
  }

  private mIsValidDescriptorSet: boolean;
  get isValidDescriptorSet() : boolean {
    return this.mIsValidDescriptorSet;
  }

  constructor(
    key: number
    , parent: IWGLDescriptorPool
  ) {
    this.mKey = key;
    this.mParent = parent;
    this.mIsValidDescriptorSet = false;
  }

  private mResources: Array<WGLDescriptorPoolResourceInfo>|null;
  get resources(): Array<WGLDescriptorPoolResourceInfo> {
    if (this.mResources == null)
      throw new Error('this.mResources is null');

    return this.mResources as Array<WGLDescriptorPoolResourceInfo>;
  }

  initialize(resources: Array<WGLDescriptorPoolResourceInfo>) {
    this.mResources = resources;
    this.mIsValidDescriptorSet = true;
  }

  invalidate(): void {
    this.mResources = null;
    this.mIsValidDescriptorSet = false;
  }

  isDifferent(other: IWGLDescriptorSet|null): boolean	{
    if (other == null)
      return true;

    if (this.mParent === other.parent)
      return false;

    return this.mKey != other.key;
  }    
}
