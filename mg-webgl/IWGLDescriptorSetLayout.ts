import {IMgDescriptorSetLayout}
	from '../mg/IMgDescriptorSetLayout';   
import {WGLUniformBinding}
	from './WGLUniformBinding';	  

export interface IWGLDescriptorSetLayout
  extends IMgDescriptorSetLayout {
  readonly uniforms: Array<WGLUniformBinding>;
}
