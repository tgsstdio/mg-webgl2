namespace Magnesium {
    export interface IWGLDescriptorSetLayout
      extends IMgDescriptorSetLayout {
      readonly uniforms: Array<GLUniformBinding>;
    }
}