import Matrix4 from './Matrix4'

export class UniformBufferObject {
  projectionMatrix: Matrix4;
  modelMatrix: Matrix4;
  viewMatrix: Matrix4;

  constructor() {
    this.projectionMatrix = Matrix4.identity;
    this.modelMatrix = Matrix4.identity;
    this.viewMatrix = Matrix4.identity;
  }
}