import {IMgDescriptorSetLayout}
	from '../mg/IMgDescriptorSetLayout';   
import {WGLUniformBinding}
	from './pipeline/WGLUniformBinding';	  

export interface IWGLDescriptorSetLayout
  extends IMgDescriptorSetLayout {
  readonly uniforms: Array<WGLUniformBinding>;
}
