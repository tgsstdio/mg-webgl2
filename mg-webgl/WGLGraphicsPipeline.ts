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

		private mVertexInput: WGLVertexBufferBinder;
		private populateVertexDefinition(
      vertexInput: MgPipelineVertexInputStateCreateInfo
    ): void {
			let perInstance = new Map<number, WGLVertexBufferBinding>();

			for (let vbuf of vertexInput.vertexBindingDescriptions) {
				let def = new WGLVertexBufferBinding ();
        def.binding = vbuf.binding;
        def.inputRate = vbuf.inputRate;
        def.stride = vbuf.stride;
				perInstance.set (def.binding, def);
			}

			let keys = new Array<number>(perInstance.size);
      for (let key of perInstance.keys()) {
        keys.push(key);
      }
      let sortedKeys:  Array<number> = keys.sort((a,b) => a < b ? -1 : 1);

      let bindings = new Array<WGLVertexBufferBinding>();

      for (let key of sortedKeys) {
        let found = perInstance.get(key) as WGLVertexBufferBinding;
        bindings.push(found);
      }

			let attributes = new Array<WGLVertexInputAttribute> ();
			for (let vertAttrDesc of vertexInput.vertexAttributeDescriptions)
			{
				let binding = bindings[vertAttrDesc.binding];

				let elementInfo = WGLGraphicsPipeline.getAttributeFormat(vertAttrDesc.format);

				let divisor = (binding.inputRate == MgVertexInputRate.INSTANCE) ? 1 : 0;

        const MAX_INT_VALUE = Number.MAX_SAFE_INTEGER;
				if ( binding.stride > MAX_INT_VALUE)
					throw new Error ("ERROR : binding.Stride[i] > " + MAX_INT_VALUE);

				let att = new WGLVertexInputAttribute();
        att.binding = vertAttrDesc.binding;

				att.location = vertAttrDesc.location;
				att.offset = vertAttrDesc.offset;
				att.stride = binding.stride;

				att.divisor = divisor;
				att.size = elementInfo.size;
				att.pointerType = elementInfo.pointerType;
				att.isNormalized = elementInfo.isNormalized;
				att.function = elementInfo.function;

				attributes.push (att);
			}

			this.mVertexInput = new WGLVertexBufferBinder (bindings, attributes);
		}    

		private static getAttributeFormat (format: MgFormat) : WGLVertexAttributeInfo
		{
			switch (format)
			{
			case MgFormat.R8_SINT:
				return new WGLVertexAttributeInfo(
					1
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R8G8_SINT:
				return new WGLVertexAttributeInfo(
					2
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R8G8B8_SINT:							
			case MgFormat.B8G8R8_SINT:	// TODO : swizzle	
				return new WGLVertexAttributeInfo(
					3
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R8G8B8A8_SINT:
				return new WGLVertexAttributeInfo(				
					4
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R16_SINT:
				return new WGLVertexAttributeInfo(					
					1
					, false
					, WGLVertexAttributeType.SHORT
					, WGLVertexAttribFunction.INT			
        );
			case MgFormat.R16G16_SINT:
				return new WGLVertexAttributeInfo(					
					2
					, false
					, WGLVertexAttributeType.SHORT
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R16G16B16_SINT:
				return new WGLVertexAttributeInfo(				
					3
					, false
					, WGLVertexAttributeType.SHORT
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R16G16B16A16_SINT:
				return new WGLVertexAttributeInfo(				
					4
					, false
					, WGLVertexAttributeType.SHORT
					, WGLVertexAttribFunction.INT
        );

			case MgFormat.R32_SINT:
				return new WGLVertexAttributeInfo(				
					 1
					, false
					, WGLVertexAttributeType.INT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R32G32_SINT:
				return new WGLVertexAttributeInfo(					
					2
					, false
					, WGLVertexAttributeType.INT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R32G32B32_SINT:
				return new WGLVertexAttributeInfo(					
					3
					, false
					, WGLVertexAttributeType.INT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R32G32B32A32_SINT:
				return new WGLVertexAttributeInfo(					
					4
					, false
					, WGLVertexAttributeType.INT
					, WGLVertexAttribFunction.INT
        );

			case MgFormat.R8_UINT:
				return new WGLVertexAttributeInfo(				
					1
					, false
					, WGLVertexAttributeType.UNSIGNED_BYTE
					, WGLVertexAttribFunction.INT
        );			
			case MgFormat.R8G8_UINT:
				return new WGLVertexAttributeInfo(					
					2
					, false
					, WGLVertexAttributeType.UNSIGNED_BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R8G8B8_UINT:							
			case MgFormat.B8G8R8_UINT:	// TODO : swizzle	
				return new WGLVertexAttributeInfo(					
					3
					, false
					, WGLVertexAttributeType.UNSIGNED_BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R8G8B8A8_UINT:
				return new WGLVertexAttributeInfo(					
					4
					, false
					, WGLVertexAttributeType.UNSIGNED_BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R16_UINT:
				return new WGLVertexAttributeInfo(	
					1
					, false
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );				
			case MgFormat.R16G16_UINT:
				return new WGLVertexAttributeInfo(	
					2
					, false
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R16G16B16_UINT:
				return new WGLVertexAttributeInfo(
					3
					, false
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R16G16B16A16_UINT:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R32_UINT:
				return new WGLVertexAttributeInfo(	
					1
					, false
					, WGLVertexAttributeType.UNSIGNED_INT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R32G32_UINT:
				return new WGLVertexAttributeInfo(	
					2
					, false
					, WGLVertexAttributeType.UNSIGNED_INT
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R32G32B32_UINT:
				return new WGLVertexAttributeInfo(	
					3
					, false
					, WGLVertexAttributeType.UNSIGNED_INT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R32G32B32A32_UINT:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.UNSIGNED_INT
					, WGLVertexAttribFunction.INT
        );

			case MgFormat.R32_SFLOAT:
				return new WGLVertexAttributeInfo(	
					1
					, false
					, WGLVertexAttributeType.FLOAT
					, WGLVertexAttribFunction.FLOAT
        );	
			case MgFormat.R32G32_SFLOAT:
				return new WGLVertexAttributeInfo(	
					2
				 	, false
					, WGLVertexAttributeType.FLOAT
					, WGLVertexAttribFunction.FLOAT
        );	
			case MgFormat.R32G32B32_SFLOAT:
				return new WGLVertexAttributeInfo(	
					3
					, false
					, WGLVertexAttributeType.FLOAT
					, WGLVertexAttribFunction.FLOAT
        );	
			case MgFormat.R32G32B32A32_SFLOAT:
				return new WGLVertexAttributeInfo(	
					4
				 	, false
					, WGLVertexAttributeType.FLOAT
					, WGLVertexAttribFunction.FLOAT
        );
			case MgFormat.R16_SFLOAT:
				return new WGLVertexAttributeInfo(	
					1
				 	, false
					, WGLVertexAttributeType.HALF_FLOAT
					, WGLVertexAttribFunction.FLOAT
        );	
			case MgFormat.R16G16_SFLOAT:
				return new WGLVertexAttributeInfo(	
					2
				 	, false
					, WGLVertexAttributeType.HALF_FLOAT
					, WGLVertexAttribFunction.FLOAT
        );	
			case MgFormat.R16G16B16_SFLOAT:
				return new WGLVertexAttributeInfo(	
					3
				 	, false
					, WGLVertexAttributeType.HALF_FLOAT
					, WGLVertexAttribFunction.FLOAT
        );	
			case MgFormat.R16G16B16A16_SFLOAT:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.HALF_FLOAT
					, WGLVertexAttribFunction.FLOAT
        );
			case MgFormat.R64_SFLOAT:
				return new WGLVertexAttributeInfo(	
					1
				 	, false
					, WGLVertexAttributeType.DOUBLE
					, WGLVertexAttribFunction.DOUBLE
        );
			case MgFormat.R64G64_SFLOAT:
				return new WGLVertexAttributeInfo(	
					2
					, false
					, WGLVertexAttributeType.DOUBLE
					, WGLVertexAttribFunction.DOUBLE
        );
			case MgFormat.R64G64B64_SFLOAT:
				return new WGLVertexAttributeInfo(	
					3
					, false
					, WGLVertexAttributeType.DOUBLE
					, WGLVertexAttribFunction.DOUBLE
        );
			case MgFormat.R64G64B64A64_SFLOAT:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.DOUBLE
					, WGLVertexAttribFunction.DOUBLE
        );

			// NORMALIZED

			case MgFormat.R8_SNORM:
				return new WGLVertexAttributeInfo(	
					1
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );			
			case MgFormat.R8G8_SNORM:
				return new WGLVertexAttributeInfo(	
					2
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R8G8B8_SNORM:							
			case MgFormat.B8G8R8_SNORM:	// TODO : swizzle	
				return new WGLVertexAttributeInfo(	
					3
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R8G8B8A8_SNORM:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.BYTE
					, WGLVertexAttribFunction.INT
        );

			case MgFormat.R16_UNORM:
				return new WGLVertexAttributeInfo(
					1
					, true
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );				
			case MgFormat.R16G16_UNORM:
				return new WGLVertexAttributeInfo(	
					2
					, true
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );	
			case MgFormat.R16G16B16_UNORM:
				return new WGLVertexAttributeInfo(	
					3
					, true
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.R16G16B16A16_UNORM:
				return new WGLVertexAttributeInfo(	
					4
					, true
					, WGLVertexAttributeType.UNSIGNED_SHORT
					, WGLVertexAttribFunction.INT
        );		

			// A2B10G10R10
			case MgFormat.A2B10G10R10_SINT_PACK32:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.INT_2101010_REV
					, WGLVertexAttribFunction.INT
        );
			case MgFormat.A2B10G10R10_SNORM_PACK32:
				return new WGLVertexAttributeInfo(	
					4
					, true
					, WGLVertexAttributeType.INT_2101010_REV
					, WGLVertexAttribFunction.FLOAT
        );

			case MgFormat.A2B10G10R10_SSCALED_PACK32:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.INT_2101010_REV
					, WGLVertexAttribFunction.FLOAT
        );

			case MgFormat.A2B10G10R10_UINT_PACK32:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.UNSIGNED_INT_2101010_REV
					, WGLVertexAttribFunction.FLOAT
        );

			case MgFormat.A2B10G10R10_UNORM_PACK32:
				return new WGLVertexAttributeInfo(	
					4
					, true
					, WGLVertexAttributeType.UNSIGNED_INT_2101010_REV
					, WGLVertexAttribFunction.FLOAT
        );

			case MgFormat.A2B10G10R10_USCALED_PACK32:
				return new WGLVertexAttributeInfo(	
					4
					, false
					, WGLVertexAttributeType.UNSIGNED_INT_2101010_REV
					, WGLVertexAttribFunction.FLOAT
        );
			
			default:
				throw new Error('ERROR - not supported');
			}
		}    
  }
}