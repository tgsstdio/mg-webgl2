import {IMgDeviceMemory}
	from '../mg/IMgDeviceMemory';  
import {IMgBuffer}
	from '../mg/IMgBuffer';   
import {MgDescriptorBufferInfo}
	from '../mg/MgDescriptorBufferInfo'; 

// Uniform block object
export class UniformData {
  memory: IMgDeviceMemory;
  buffer: IMgBuffer;
  descriptor: MgDescriptorBufferInfo;
}

