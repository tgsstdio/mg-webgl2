namespace Magnesium {
  export class WGLGraphicsPipeline implements IWGLGraphicsPipeline {    

    constructor(info: MgGraphicsPipelineCreateInfo) {
      this.populateInputAssembly(info.inputAssemblyState);
    }

    destroyPipeline(): void {

    }

    private mTopology: number;
    get topology() : MgPrimitiveTopology {
      return this.mTopology;
    }

    private mPrimitiveRestartEnable: boolean;
    private populateInputAssembly(
      inputAssemblyState: MgPipelineInputAssemblyStateCreateInfo
    ) : void {
      this.mTopology = inputAssemblyState.topology;
      this.mPrimitiveRestartEnable = inputAssemblyState.primitiveRestartEnable;
    }
  }
}