/// <reference path="GLPoolResourceTicket.ts" />
/// <reference path="GLDescriptorBindingGroup.ts" />

namespace Magnesium {
  export class GLDescriptorPoolResourceInfo {
    groupType: GLDescriptorBindingGroup;
    binding: number;
    descriptorCount: number;
    ticket: GLPoolResourceTicket;
  }
}