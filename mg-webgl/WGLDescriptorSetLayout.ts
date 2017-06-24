import {WGLUniformBinding}
	from './WGLUniformBinding';	  
import {IWGLDescriptorSetLayout}
	from './IWGLDescriptorSetLayout';
import {MgDescriptorSetLayoutCreateInfo}
	from '../mg/MgDescriptorSetLayoutCreateInfo';  
import {IMgDevice}
	from '../mg/IMgDevice'; 
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks'; 	 

export class WGLDescriptorSetLayout implements IWGLDescriptorSetLayout {
  private mUniforms: Array<WGLUniformBinding>;
  get uniforms() :  Array<WGLUniformBinding> {
    return this.mUniforms;
  }

  constructor(pCreateInfo: MgDescriptorSetLayoutCreateInfo) {
    if (pCreateInfo != null && pCreateInfo.bindings != null) {      
      let highestBinding = 0;
      let uniforms = new Array<WGLUniformBinding>();

      for (let binding of pCreateInfo.bindings) {
        highestBinding = Math.max(binding.binding, highestBinding);

        let uniform = new WGLUniformBinding();
        uniform.binding = binding.binding;
        uniform.descriptorType = binding.descriptorType;
        uniform.descriptorCount = binding.descriptorCount;
        uniform.stageFlags = binding.stageFlags;
        uniforms.push (uniform);
      }

      let count = highestBinding + 1;

      uniforms = new Array<WGLUniformBinding>(count);
      for(let uni of uniforms) {
        uniforms[uni.binding] = uni;
      }      
  }
  else {
      this.mUniforms = new Array<WGLUniformBinding>(0);
  }  
}

  destroyDescriptorSetLayout(
    device: IMgDevice
    , allocator: IMgAllocationCallbacks|null
  ) : void {

  }
}
