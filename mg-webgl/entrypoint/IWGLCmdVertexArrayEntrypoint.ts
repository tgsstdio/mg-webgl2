import {WGLVertexAttributeType} from '../pipeline/WGLVertexAttributeType';

export interface IWGLCmdVertexArrayEntrypoint {
  bindIndexBuffer (
    bufferId: WebGLBuffer|null
  ): void;

  bindIntVertexAttribute(
    attributeLoc: number
    , size: number
    , pointerType: WGLVertexAttributeType
    , stride: number
    , offset: number): void;

  bindFloatVertexAttribute(
    attributeLoc: number
    , size: number
    , pointerType: WGLVertexAttributeType
    , isNormalized: boolean
    , stride: number
    , offset: number): void;

  setupVertexAttributeDivisor(
    attributeLoc: number
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
