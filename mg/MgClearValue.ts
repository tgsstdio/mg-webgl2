namespace Magnesium {
  enum MgClearColorCategory {
    FLOAT,
    INT,
    UINT,
  }

  export class MgClearValue {
    private mValue: MgClearColorValue | MgClearDepthStencilValue;

    get color() : MgClearColorValue {
      return this.mValue as MgClearColorValue;
    }

    set color(value : MgClearColorValue) {
      this.mValue = value;
    }

    get depthStencil() : MgClearDepthStencilValue {
      return this.mValue as MgClearDepthStencilValue;
    }

    set depthStencil(value : MgClearDepthStencilValue) {
      this.mValue = value;
    }    

    fromColorAndFormat(format: MgFormat, color: MgColor4f) : MgClearValue {
      let factor : number = 0;
      let category : MgClearColorCategory;
      switch (format) {
        case MgFormat.R8_SINT:
        case MgFormat.R8G8_SINT:
        case MgFormat.R8G8B8_SINT:
        case MgFormat.R8G8B8A8_SINT:
        case MgFormat.B8G8R8_SINT:
        case MgFormat.B8G8R8A8_SINT:
          factor = 127; //sbyte.MaxValue;
          category = MgClearColorCategory.INT;
          break;
        case MgFormat.R16_SINT:
        case MgFormat.R16G16_SINT:
        case MgFormat.R16G16B16_SINT:
        case MgFormat.R16G16B16A16_SINT:
            factor = 32767; // short.MaxValue;
            category = MgClearColorCategory.INT;
            break;
        case MgFormat.R32_SINT:
        case MgFormat.R32G32_SINT:
        case MgFormat.R32G32B32_SINT:
        case MgFormat.R32G32B32A32_SINT:
            factor = 2147483647; // int.MaxValue;
            category = MgClearColorCategory.INT;
            break;
        case MgFormat.R64_SINT:
        case MgFormat.R64G64_SINT:
        case MgFormat.R64G64B64_SINT:
        case MgFormat.R64G64B64A64_SINT:      
            factor = 2147483647; // long.MaxValue;
            category = MgClearColorCategory.INT;
            break;
        case MgFormat.R8_UINT:
        case MgFormat.R8G8_UINT:
        case MgFormat.R8G8B8_UINT:
        case MgFormat.R8G8B8A8_UINT:
        case MgFormat.B8G8R8_UINT:
        case MgFormat.B8G8R8A8_UINT:
              factor = 255; // byte.MaxValue;
              category = MgClearColorCategory.UINT;
              break;
        case MgFormat.R16_UINT:
        case MgFormat.R16G16_UINT:
        case MgFormat.R16G16B16_UINT:
        case MgFormat.R16G16B16A16_UINT:
            factor = 65535; //ushort.MaxValue;
            category = MgClearColorCategory.UINT;
            break;
        case MgFormat.R32_UINT:
        case MgFormat.R32G32_UINT:
        case MgFormat.R32G32B32_UINT:
        case MgFormat.R32G32B32A32_UINT:
            factor = 4294967295; //uint.MaxValue;
            category = MgClearColorCategory.UINT;
            break;
        case MgFormat.R64_UINT:
        case MgFormat.R64G64_UINT:
        case MgFormat.R64G64B64_UINT:
        case MgFormat.R64G64B64A64_UINT:
            // WARN: factor requires UInt64
            factor = 18446744073709551615; // ulong.MaxValue;
            category = MgClearColorCategory.UINT;
            break;

        case MgFormat.R8_SNORM:
        case MgFormat.R8G8_SNORM:
        case MgFormat.R8G8B8_SNORM:
        case MgFormat.R8G8B8A8_SNORM:
        case MgFormat.R16_SNORM:
        case MgFormat.R16G16_SNORM:
        case MgFormat.R16G16B16_SNORM:
        case MgFormat.R16G16B16A16_SNORM:
        case MgFormat.R8_UNORM:
        case MgFormat.R8G8_UNORM:
        case MgFormat.R8G8B8_UNORM:
        case MgFormat.R8G8B8A8_UNORM:
        case MgFormat.R16_UNORM:
        case MgFormat.R16G16_UNORM:
        case MgFormat.R16G16B16_UNORM:
        case MgFormat.R16G16B16A16_UNORM:
        case MgFormat.B8G8R8_UNORM:
        case MgFormat.B8G8R8A8_UNORM:
        case MgFormat.R32_SFLOAT:
        case MgFormat.R32G32_SFLOAT:
        case MgFormat.R32G32B32_SFLOAT:
        case MgFormat.R32G32B32A32_SFLOAT:
        case MgFormat.R64_SFLOAT:
        case MgFormat.R64G64_SFLOAT:
        case MgFormat.R64G64B64_SFLOAT:
        case MgFormat.R64G64B64A64_SFLOAT:
            factor = 1;
            category = MgClearColorCategory.FLOAT;
            break;
        default:
            throw Error('Mg: invalid format used');
      }

      let clearValue =  new MgClearValue();
      clearValue.color = new MgClearColorValue();
      switch (category)
      {
          // TODO: REDUNDANT
          case MgClearColorCategory.INT:
            clearValue.color.int32 = new MgVec4i((color.r * factor), (color.g * factor), (color.b * factor), (color.a * factor));
            return clearValue;            
          case MgClearColorCategory.UINT:
            clearValue.color.uint32 = new MgVec4Ui((color.r * factor), (color.g * factor), (color.b * factor), (color.a * factor));
            return clearValue;            
          case MgClearColorCategory.FLOAT:
            clearValue.color.float32 = new MgColor4f((color.r * factor), (color.g * factor), (color.b * factor), (color.a * factor));
            return clearValue;
          default:
              throw Error('fromColorAndFormat : invalid format');
      }    
  }      


  }
}