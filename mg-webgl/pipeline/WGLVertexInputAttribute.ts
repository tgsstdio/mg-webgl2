import {WGLVertexAttribFunction}
	from './WGLVertexAttribFunction';	
import {WGLVertexAttributeType}
	from './WGLVertexAttributeType';	

export class WGLVertexInputAttribute {
  function: WGLVertexAttribFunction;
  binding: number;
  location: number;
  size: number;
  pointerType: WGLVertexAttributeType;
  isNormalized: boolean;
  stride: number;
  offset: number;
  divisor: number;
}
