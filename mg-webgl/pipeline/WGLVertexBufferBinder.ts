import {WGLVertexBufferBinding}
	from './WGLVertexBufferBinding';
import {WGLVertexInputAttribute}
	from './WGLVertexInputAttribute';

export class WGLVertexBufferBinder {
  private mBindings: Array<WGLVertexBufferBinding>;
  private mAttributes: Array<WGLVertexInputAttribute>;
  constructor(
    bindings: Array<WGLVertexBufferBinding>
    , attributes: Array<WGLVertexInputAttribute>
  ) {
    this.mBindings = bindings;
    this.mAttributes = attributes;
  }

  get bindings() : Array<WGLVertexBufferBinding> {
    return this.mBindings;
  }

  get attributes(): Array<WGLVertexInputAttribute> {
    return this.mAttributes; 
  }
}
