import {IMgDeviceMemory}
	from '../mg/IMgDeviceMemory';  
import {IMgBuffer}
	from '../mg/IMgBuffer';  

export class IndicesInfo {
  memory: IMgDeviceMemory;
  buffer: IMgBuffer;
  count: number;
}