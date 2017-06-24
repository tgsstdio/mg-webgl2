import {IMgDevice}
	from '../mg/IMgDevice';	  
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';
import {IWGLPipelineLayout}
	from './IWGLPipelineLayout';	  
import {WGLUniformBinding}
	from './WGLUniformBinding';
import {WGLBindingPointOffsetInfo}
	from './WGLBindingPointOffsetInfo';	
import {WGLDynamicOffsetInfo}
	from './WGLDynamicOffsetInfo';
import {MgPipelineLayoutCreateInfo}
	from '../mg/MgPipelineLayoutCreateInfo';  
import {MgDescriptorType}
	from '../mg/MgDescriptorType'; 
import {IWGLDescriptorSetLayout}
	from './IWGLDescriptorSetLayout';
import {WGLBufferRangeTarget}
	from './WGLBufferRangeTarget';    	

export class WGLPipelineLayout implements IWGLPipelineLayout {
  private mBindings: Array<WGLUniformBinding>;
  get bindings(): Array<WGLUniformBinding> {
    return this.mBindings;
  }

  private mNoOfBindingPoints: number;
  get noOfBindingPoints(): number {
    return this.mNoOfBindingPoints;
  }

  private mNoOfStorageBuffers: number;
  get noOfStorageBuffers(): number {
    return this.mNoOfStorageBuffers;
  }

  private mNoOfExpectedDynamicOffsets: number;
  get noOfExpectedDynamicOffsets(): number {
    return this.mNoOfExpectedDynamicOffsets;
  }

  private mRanges: Map<number, WGLBindingPointOffsetInfo>;
  get ranges(): Map<number, WGLBindingPointOffsetInfo> {
    return this.mRanges;
  }

  private mOffsetDestinations: Array<WGLDynamicOffsetInfo>;
  get offsetDestinations(): Array<WGLDynamicOffsetInfo> {
    return this.mOffsetDestinations;
  }

  constructor(pCreateInfo: MgPipelineLayoutCreateInfo) {
    if (pCreateInfo.setLayouts.length == 1) {
      let layout = pCreateInfo.setLayouts[0] as IWGLDescriptorSetLayout;
    }
    else {
      this.mBindings = new Array<WGLUniformBinding>(0);
    }
    this.mNoOfBindingPoints = 0;
    this.mNoOfStorageBuffers = 0;
    this.mNoOfExpectedDynamicOffsets = 0;

    this.mRanges = new Map<number, WGLBindingPointOffsetInfo>();
    this.mOffsetDestinations = this.extractBindingsInformation();
    this.setupOffsetRangesByBindings();
  }

  private extractBindingsInformation()
    : Array<WGLDynamicOffsetInfo> {
    let signPosts = new Array<WGLDynamicOffsetInfo>();
    // build flat slots array for uniforms 
    for (let desc of this.mBindings) {
      if (desc.descriptorType == MgDescriptorType.UNIFORM_BUFFER
        || desc.descriptorType == MgDescriptorType.UNIFORM_BUFFER_DYNAMIC
      ) {
        this.mNoOfBindingPoints += desc.descriptorCount;
        let tempRange = new WGLBindingPointOffsetInfo();
        tempRange.binding = desc.binding;
        tempRange.first = 0,
        tempRange.last = desc.descriptorCount - 1;
        this.mRanges.set(desc.binding, tempRange);

        if (desc.descriptorType == MgDescriptorType.UNIFORM_BUFFER_DYNAMIC) {
          let post = new WGLDynamicOffsetInfo();
          post.target = WGLBufferRangeTarget.UNIFORM_BUFFER;
          post.dstIndex = this.mNoOfExpectedDynamicOffsets;
          this.mNoOfExpectedDynamicOffsets += desc.descriptorCount;
        }
      }
      else if (desc.descriptorType == MgDescriptorType.STORAGE_BUFFER
        || desc.descriptorType == MgDescriptorType.STORAGE_BUFFER_DYNAMIC
      ) {
        this.mNoOfStorageBuffers += desc.descriptorCount;

        if (desc.descriptorType ==  MgDescriptorType.STORAGE_BUFFER_DYNAMIC) {
          let post = new WGLDynamicOffsetInfo();
          post.target = WGLBufferRangeTarget.STORAGE_BUFFER;
          post.dstIndex = desc.binding;
          signPosts.push(post);
          this.mNoOfExpectedDynamicOffsets += desc.descriptorCount;
        }
      }

    }
    return signPosts;        
  }

  private setupOffsetRangesByBindings() : void
  {
    let keys = new Array<number>();
    for (let key of this.mRanges.keys()) {
      keys.push(key);
    }

    let sortedKeys = keys.sort((a,b) => a < b ? -1 : 1);

    let startingOffset = 0;
    for (let key of sortedKeys) {
        let range = this.mRanges.get(key) as WGLBindingPointOffsetInfo;
        range.first += startingOffset;
        range.last += startingOffset;
        startingOffset = range.last + 1;
    }
  }

  destroyPipelineLayout(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null
  ) : void {

  }
}
