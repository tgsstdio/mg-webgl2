// Vertex buffer and attributes
class VertexBufferInfo {
  memory: Magnesium.IMgDeviceMemory;	// Handle to the device memory for this buffer
  buffer: Magnesium.IMgBuffer; // Handle to the Vulkan buffer object that the memory is bound to
  inputState: Magnesium.MgPipelineVertexInputStateCreateInfo 
  inputBinding: Magnesium.MgVertexInputBindingDescription;
  inputAttributes: Array<Magnesium.MgVertexInputAttributeDescription>;
}

export default VertexBufferInfo;