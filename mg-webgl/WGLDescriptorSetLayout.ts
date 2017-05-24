namespace Magnesium {
  export class WGLDescriptorSetLayout implements IWGLDescriptorSetLayout {
    private mUniforms: Array<GLUniformBinding>;
    get uniforms() :  Array<GLUniformBinding> {
      return this.mUniforms;
    }

    constructor(pCreateInfo: MgDescriptorSetLayoutCreateInfo) {
      if (pCreateInfo != null && pCreateInfo.bindings != null) {      
        let highestBinding = 0;
        let uniforms = new Array<GLUniformBinding>();

        for (let binding of pCreateInfo.bindings) {
          highestBinding = Math.max(binding.binding, highestBinding);

          let uniform = new GLUniformBinding();
          uniform.binding = binding.binding;
          uniform.descriptorType = binding.descriptorType;
          uniform.descriptorCount = binding.descriptorCount;
          uniform.stageFlags = binding.stageFlags;
          uniforms.push (uniform);
        }

        let count = highestBinding + 1;

        uniforms = new Array<GLUniformBinding>(count);
        for(let uni of uniforms) {
          uniforms[uni.binding] = uni;
        }      
    }
    else {
        this.mUniforms = new Array<GLUniformBinding>(0);
    }  
  }

    destroyDescriptorSetLayout(
      device: IMgDevice
      , allocator: IMgAllocationCallbacks|null
    ) : void {

		}
  }
}