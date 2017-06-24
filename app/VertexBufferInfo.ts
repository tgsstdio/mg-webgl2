import {IMgDeviceMemory}
	from '../mg/IMgDeviceMemory';  
import {IMgBuffer}
	from '../mg/IMgBuffer';
import {MgPipelineVertexInputStateCreateInfo}
	from '../mg/MgPipelineVertexInputStateCreateInfo';  
import {MgVertexInputBindingDescription}
	from '../mg/MgVertexInputBindingDescription';    
import {MgVertexInputAttributeDescription}
	from '../mg/MgVertexInputAttributeDescription';    

// Vertex buffer and attributes
export class VertexBufferInfo {
  memory: IMgDeviceMemory;	// Handle to the device memory for this buffer
  buffer: IMgBuffer; // Handle to the Vulkan buffer object that the memory is bound to
  inputState: MgPipelineVertexInputStateCreateInfo 
  inputBinding: MgVertexInputBindingDescription;
  inputAttributes: Array<MgVertexInputAttributeDescription>;
}