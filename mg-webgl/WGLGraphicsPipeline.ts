namespace Magnesium {
  export interface IWGLGraphicsPipelineEntrypoint {

  }

  export class WGLGraphicsPipeline implements IWGLGraphicsPipeline {    
    private mEntrypoint: IWGLGraphicsPipelineEntrypoint;
    private mProgram: WebGLProgram;
    private mInternalCache: GLInternalCache;
    private mLayout: IWGLPipelineLayout;    

    constructor(
      entrypoint: IWGLGraphicsPipelineEntrypoint
      , program: WebGLProgram
      , info: MgGraphicsPipelineCreateInfo
      , internalCache: GLInternalCache
      , layout: IWGLPipelineLayout
    ) {
      if (info == null) {
        throw new Error('info is null');
      }

      if (info.vertexInputState == null) {
        throw new Error('info.vertexInputState is null');
      } 

      if (info.inputAssemblyState == null) {
        throw new Error('info.inputAssemblyState is null');
      }      

			if (info.rasterizationState == null)
			{
				throw new Error('info.rasterizationState is null');
			}      

      this.mEntrypoint = entrypoint;
      this.mProgram = program;
      this.mInternalCache = internalCache;
      this.mLayout = layout;

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

		private vertexInput: GLVertexBufferBinder;
		private populateVertexDefinition(
      vertexInput: MgPipelineVertexInputStateCreateInfo
    ): void {
			let perInstance = new Map<number, GLVertexBufferBinding>();

			for (let vbuf of vertexInput.vertexBindingDescriptions) {
				let def = new GLVertexBufferBinding ();
        def.binding = vbuf.binding;
        def.inputRate = vbuf.inputRate;
        def.stride = vbuf.stride;
				perInstance.set (def.binding, def);
			}

			let keys = new Array<number>(perInstance.size);
      for (let key of perInstance.keys()) {
        keys.push(key);
      }
      let sortedKeys = keys.sort((a,b) => a < b ? -1 : 1);

      let bindings = new Array<GLVertexBufferBinding>();

      for (let key in sortedKeys) {
        let found = perInstance.get(key) as GLVertexBufferBinding;
        bindings.push(found);
      }

			let attributes = new Array<GLVertexInputAttribute> ();
			for (let vertAttrDesc of vertexInput.vertexAttributeDescriptions)
			{
				let binding = bindings[vertAttrDesc.binding];

				let elementInfo = GetAttributeFormat(vertAttrDesc.format);

				let divisor = (binding.inputRate == MgVertexInputRate.INSTANCE) ? 1 : 0;

        const MAX_INT_VALUE = Number.MAX_SAFE_INTEGER;
				if ( binding.stride > MAX_INT_VALUE)
					throw new Error ("ERROR : binding.Stride[i] > " + MAX_INT_VALUE);

				let att = new GLVertexInputAttribute();
        att.binding = vertAttrDesc.binding;

				att.location = vertAttrDesc.location;
				att.offset = vertAttrDesc.offset;
				att.stride = binding.stride;

				att.divisor = divisor,
				att.size = elementInfo.Size,
				att.pointerType = elementInfo.PointerType,
				att.isNormalized = elementInfo.IsNormalized,
				att.function = elementInfo.Function,				

				attributes.push (att);
			}

			this.mVertexInput = new GLVertexBufferBinder (bindings, attributes);
		}    
  }
}