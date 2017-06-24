import {IMgDeviceMemory}
	from '../mg/IMgDeviceMemory';  
import {IMgBuffer}
	from '../mg/IMgBuffer'; 

export class StagingBuffer {
  memory: IMgDeviceMemory;
  buffer: IMgBuffer;
}
