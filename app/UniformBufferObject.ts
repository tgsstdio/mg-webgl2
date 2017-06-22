import Matrix4 from './Matrix4'

export class UniformBufferObject {
  projectionMatrix: Matrix4;
  modelMatrix: Matrix4;
  viewMatrix: Matrix4;
}

export default UniformBufferObject;