namespace Magnesium {
  export class WGLFenceEntrypoint implements IWGLFenceEntrypoint {
    createFence(): never {
      throw new Error("not implemented");
    }
  }
}