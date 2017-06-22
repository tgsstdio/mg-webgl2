import {WGLDescriptorBindingGroup} from './WGLDescriptorBindingGroup'
import {WGLPoolResourceTicket} from './WGLPoolResourceTicket'

export class WGLDescriptorPoolResourceInfo {
  groupType: WGLDescriptorBindingGroup;
  binding: number;
  descriptorCount: number;
  ticket: WGLPoolResourceTicket;
}
