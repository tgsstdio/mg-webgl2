import {WGLVertexAttributeType} from '../pipeline/WGLVertexAttributeType';

export interface IWGLCmdVertexArrayEntrypoint {
  bindIndexBuffer (
    bufferId: WebGLBuffer|null
  ): void;

  bindIntVertexAttribute(
    location: number
    , size: number
    , pointerType: WGLVertexAttributeType
    , stride: number
    , offset: number): void;

  bindFloatVertexAttribute(
    location: number
    , size: number
    , pointerType: WGLVertexAttributeType
    , isNormalized: boolean
    , stride: number
    , offset: number): void;

  setupVertexAttributeDivisor(
    location: number
    , divisor: number) : void;

  generateVBO (): WebGLVertexArrayObject;
  bindVertexArray(vbo:WebGLVertexArrayObject|null) : void;

  deleteVBO(vbo: WebGLVertexArrayObject): void;
  unbindVertexArray() : void;    

  // WARN : offsets must be long
  bindVertexBuffer(
    bufferId: WebGLBuffer|null
    ) : void;
}
