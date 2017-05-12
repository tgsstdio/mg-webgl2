"use strict";
var Magnesium;
(function (Magnesium) {
    var MgClearColorCategory;
    (function (MgClearColorCategory) {
        MgClearColorCategory[MgClearColorCategory["FLOAT"] = 0] = "FLOAT";
        MgClearColorCategory[MgClearColorCategory["INT"] = 1] = "INT";
        MgClearColorCategory[MgClearColorCategory["UINT"] = 2] = "UINT";
    })(MgClearColorCategory || (MgClearColorCategory = {}));
    var MgClearValue = (function () {
        function MgClearValue() {
        }
        Object.defineProperty(MgClearValue.prototype, "color", {
            get: function () {
                return this.mValue;
            },
            set: function (value) {
                this.mValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MgClearValue.prototype, "depth", {
            get: function () {
                return this.mValue;
            },
            set: function (value) {
                this.mValue = value;
            },
            enumerable: true,
            configurable: true
        });
        MgClearValue.prototype.fromColorAndFormat = function (format, color) {
            var factor = 0;
            var category;
            switch (format) {
                case Magnesium.MgFormat.R8_SINT:
                case Magnesium.MgFormat.R8G8_SINT:
                case Magnesium.MgFormat.R8G8B8_SINT:
                case Magnesium.MgFormat.R8G8B8A8_SINT:
                case Magnesium.MgFormat.B8G8R8_SINT:
                case Magnesium.MgFormat.B8G8R8A8_SINT:
                    factor = 127;
                    category = MgClearColorCategory.INT;
                    break;
                case Magnesium.MgFormat.R16_SINT:
                case Magnesium.MgFormat.R16G16_SINT:
                case Magnesium.MgFormat.R16G16B16_SINT:
                case Magnesium.MgFormat.R16G16B16A16_SINT:
                    factor = 32767;
                    category = MgClearColorCategory.INT;
                    break;
                case Magnesium.MgFormat.R32_SINT:
                case Magnesium.MgFormat.R32G32_SINT:
                case Magnesium.MgFormat.R32G32B32_SINT:
                case Magnesium.MgFormat.R32G32B32A32_SINT:
                    factor = 2147483647;
                    category = MgClearColorCategory.INT;
                    break;
                case Magnesium.MgFormat.R64_SINT:
                case Magnesium.MgFormat.R64G64_SINT:
                case Magnesium.MgFormat.R64G64B64_SINT:
                case Magnesium.MgFormat.R64G64B64A64_SINT:
                    factor = 2147483647;
                    category = MgClearColorCategory.INT;
                    break;
                case Magnesium.MgFormat.R8_UINT:
                case Magnesium.MgFormat.R8G8_UINT:
                case Magnesium.MgFormat.R8G8B8_UINT:
                case Magnesium.MgFormat.R8G8B8A8_UINT:
                case Magnesium.MgFormat.B8G8R8_UINT:
                case Magnesium.MgFormat.B8G8R8A8_UINT:
                    factor = 255;
                    category = MgClearColorCategory.UINT;
                    break;
                case Magnesium.MgFormat.R16_UINT:
                case Magnesium.MgFormat.R16G16_UINT:
                case Magnesium.MgFormat.R16G16B16_UINT:
                case Magnesium.MgFormat.R16G16B16A16_UINT:
                    factor = 65535;
                    category = MgClearColorCategory.UINT;
                    break;
                case Magnesium.MgFormat.R32_UINT:
                case Magnesium.MgFormat.R32G32_UINT:
                case Magnesium.MgFormat.R32G32B32_UINT:
                case Magnesium.MgFormat.R32G32B32A32_UINT:
                    factor = 4294967295;
                    category = MgClearColorCategory.UINT;
                    break;
                case Magnesium.MgFormat.R64_UINT:
                case Magnesium.MgFormat.R64G64_UINT:
                case Magnesium.MgFormat.R64G64B64_UINT:
                case Magnesium.MgFormat.R64G64B64A64_UINT:
                    factor = 18446744073709551615;
                    category = MgClearColorCategory.UINT;
                    break;
                case Magnesium.MgFormat.R8_SNORM:
                case Magnesium.MgFormat.R8G8_SNORM:
                case Magnesium.MgFormat.R8G8B8_SNORM:
                case Magnesium.MgFormat.R8G8B8A8_SNORM:
                case Magnesium.MgFormat.R16_SNORM:
                case Magnesium.MgFormat.R16G16_SNORM:
                case Magnesium.MgFormat.R16G16B16_SNORM:
                case Magnesium.MgFormat.R16G16B16A16_SNORM:
                case Magnesium.MgFormat.R8_UNORM:
                case Magnesium.MgFormat.R8G8_UNORM:
                case Magnesium.MgFormat.R8G8B8_UNORM:
                case Magnesium.MgFormat.R8G8B8A8_UNORM:
                case Magnesium.MgFormat.R16_UNORM:
                case Magnesium.MgFormat.R16G16_UNORM:
                case Magnesium.MgFormat.R16G16B16_UNORM:
                case Magnesium.MgFormat.R16G16B16A16_UNORM:
                case Magnesium.MgFormat.B8G8R8_UNORM:
                case Magnesium.MgFormat.B8G8R8A8_UNORM:
                case Magnesium.MgFormat.R32_SFLOAT:
                case Magnesium.MgFormat.R32G32_SFLOAT:
                case Magnesium.MgFormat.R32G32B32_SFLOAT:
                case Magnesium.MgFormat.R32G32B32A32_SFLOAT:
                case Magnesium.MgFormat.R64_SFLOAT:
                case Magnesium.MgFormat.R64G64_SFLOAT:
                case Magnesium.MgFormat.R64G64B64_SFLOAT:
                case Magnesium.MgFormat.R64G64B64A64_SFLOAT:
                    factor = 1;
                    category = MgClearColorCategory.FLOAT;
                    break;
                default:
                    throw Error('Mg: invalid format used');
            }
            var clearValue = new MgClearValue();
            clearValue.color = new Magnesium.MgClearColorValue();
            switch (category) {
                case MgClearColorCategory.INT:
                    clearValue.color.int32 = new Magnesium.MgVec4i((color.r * factor), (color.g * factor), (color.b * factor), (color.a * factor));
                    return clearValue;
                case MgClearColorCategory.UINT:
                    clearValue.color.uint32 = new Magnesium.MgVec4Ui((color.r * factor), (color.g * factor), (color.b * factor), (color.a * factor));
                    return clearValue;
                case MgClearColorCategory.FLOAT:
                    clearValue.color.float32 = new Magnesium.MgColor4f((color.r * factor), (color.g * factor), (color.b * factor), (color.a * factor));
                    return clearValue;
                default:
                    throw Error('fromColorAndFormat : invalid format');
            }
        };
        return MgClearValue;
    }());
    Magnesium.MgClearValue = MgClearValue;
})(Magnesium || (Magnesium = {}));
//# sourceMappingURL=MgClearValue.js.map