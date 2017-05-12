"use strict";
var Magnesium;
(function (Magnesium) {
    var MgResult;
    (function (MgResult) {
        MgResult[MgResult["SUCCESS"] = 0] = "SUCCESS";
    })(MgResult = Magnesium.MgResult || (Magnesium.MgResult = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSubmitInfo = (function () {
        function MgSubmitInfo() {
        }
        return MgSubmitInfo;
    }());
    Magnesium.MgSubmitInfo = MgSubmitInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgBindSparseInfo = (function () {
        function MgBindSparseInfo() {
        }
        return MgBindSparseInfo;
    }());
    Magnesium.MgBindSparseInfo = MgBindSparseInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPresentInfoKHR = (function () {
        function MgPresentInfoKHR() {
        }
        return MgPresentInfoKHR;
    }());
    Magnesium.MgPresentInfoKHR = MgPresentInfoKHR;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgMemoryAllocateInfo = (function () {
        function MgMemoryAllocateInfo() {
        }
        return MgMemoryAllocateInfo;
    }());
    Magnesium.MgMemoryAllocateInfo = MgMemoryAllocateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageCreateFlagBits;
    (function (MgImageCreateFlagBits) {
        MgImageCreateFlagBits[MgImageCreateFlagBits["SPARSE_BINDING_BIT"] = 1] = "SPARSE_BINDING_BIT";
        MgImageCreateFlagBits[MgImageCreateFlagBits["SPARSE_RESIDENCY_BIT"] = 2] = "SPARSE_RESIDENCY_BIT";
        MgImageCreateFlagBits[MgImageCreateFlagBits["SPARSE_ALIASED_BIT"] = 4] = "SPARSE_ALIASED_BIT";
        MgImageCreateFlagBits[MgImageCreateFlagBits["MUTABLE_FORMAT_BIT"] = 8] = "MUTABLE_FORMAT_BIT";
        MgImageCreateFlagBits[MgImageCreateFlagBits["CUBE_COMPATIBLE_BIT"] = 16] = "CUBE_COMPATIBLE_BIT";
    })(MgImageCreateFlagBits = Magnesium.MgImageCreateFlagBits || (Magnesium.MgImageCreateFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageType;
    (function (MgImageType) {
        MgImageType[MgImageType["TYPE_1D"] = 1] = "TYPE_1D";
        MgImageType[MgImageType["TYPE_2D"] = 2] = "TYPE_2D";
        MgImageType[MgImageType["TYPE_3D"] = 3] = "TYPE_3D";
    })(MgImageType = Magnesium.MgImageType || (Magnesium.MgImageType = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgFormat;
    (function (MgFormat) {
        MgFormat[MgFormat["UNDEFINED"] = 0] = "UNDEFINED";
        MgFormat[MgFormat["R4G4_UNORM_PACK8"] = 1] = "R4G4_UNORM_PACK8";
        MgFormat[MgFormat["R4G4B4A4_UNORM_PACK16"] = 2] = "R4G4B4A4_UNORM_PACK16";
        MgFormat[MgFormat["B4G4R4A4_UNORM_PACK16"] = 3] = "B4G4R4A4_UNORM_PACK16";
        MgFormat[MgFormat["R5G6B5_UNORM_PACK16"] = 4] = "R5G6B5_UNORM_PACK16";
        MgFormat[MgFormat["B5G6R5_UNORM_PACK16"] = 5] = "B5G6R5_UNORM_PACK16";
        MgFormat[MgFormat["R5G5B5A1_UNORM_PACK16"] = 6] = "R5G5B5A1_UNORM_PACK16";
        MgFormat[MgFormat["B5G5R5A1_UNORM_PACK16"] = 7] = "B5G5R5A1_UNORM_PACK16";
        MgFormat[MgFormat["A1R5G5B5_UNORM_PACK16"] = 8] = "A1R5G5B5_UNORM_PACK16";
        MgFormat[MgFormat["R8_UNORM"] = 9] = "R8_UNORM";
        MgFormat[MgFormat["R8_SNORM"] = 10] = "R8_SNORM";
        MgFormat[MgFormat["R8_USCALED"] = 11] = "R8_USCALED";
        MgFormat[MgFormat["R8_SSCALED"] = 12] = "R8_SSCALED";
        MgFormat[MgFormat["R8_UINT"] = 13] = "R8_UINT";
        MgFormat[MgFormat["R8_SINT"] = 14] = "R8_SINT";
        MgFormat[MgFormat["R8_SRGB"] = 15] = "R8_SRGB";
        MgFormat[MgFormat["R8G8_UNORM"] = 16] = "R8G8_UNORM";
        MgFormat[MgFormat["R8G8_SNORM"] = 17] = "R8G8_SNORM";
        MgFormat[MgFormat["R8G8_USCALED"] = 18] = "R8G8_USCALED";
        MgFormat[MgFormat["R8G8_SSCALED"] = 19] = "R8G8_SSCALED";
        MgFormat[MgFormat["R8G8_UINT"] = 20] = "R8G8_UINT";
        MgFormat[MgFormat["R8G8_SINT"] = 21] = "R8G8_SINT";
        MgFormat[MgFormat["R8G8_SRGB"] = 22] = "R8G8_SRGB";
        MgFormat[MgFormat["R8G8B8_UNORM"] = 23] = "R8G8B8_UNORM";
        MgFormat[MgFormat["R8G8B8_SNORM"] = 24] = "R8G8B8_SNORM";
        MgFormat[MgFormat["R8G8B8_USCALED"] = 25] = "R8G8B8_USCALED";
        MgFormat[MgFormat["R8G8B8_SSCALED"] = 26] = "R8G8B8_SSCALED";
        MgFormat[MgFormat["R8G8B8_UINT"] = 27] = "R8G8B8_UINT";
        MgFormat[MgFormat["R8G8B8_SINT"] = 28] = "R8G8B8_SINT";
        MgFormat[MgFormat["R8G8B8_SRGB"] = 29] = "R8G8B8_SRGB";
        MgFormat[MgFormat["B8G8R8_UNORM"] = 30] = "B8G8R8_UNORM";
        MgFormat[MgFormat["B8G8R8_SNORM"] = 31] = "B8G8R8_SNORM";
        MgFormat[MgFormat["B8G8R8_USCALED"] = 32] = "B8G8R8_USCALED";
        MgFormat[MgFormat["B8G8R8_SSCALED"] = 33] = "B8G8R8_SSCALED";
        MgFormat[MgFormat["B8G8R8_UINT"] = 34] = "B8G8R8_UINT";
        MgFormat[MgFormat["B8G8R8_SINT"] = 35] = "B8G8R8_SINT";
        MgFormat[MgFormat["B8G8R8_SRGB"] = 36] = "B8G8R8_SRGB";
        MgFormat[MgFormat["R8G8B8A8_UNORM"] = 37] = "R8G8B8A8_UNORM";
        MgFormat[MgFormat["R8G8B8A8_SNORM"] = 38] = "R8G8B8A8_SNORM";
        MgFormat[MgFormat["R8G8B8A8_USCALED"] = 39] = "R8G8B8A8_USCALED";
        MgFormat[MgFormat["R8G8B8A8_SSCALED"] = 40] = "R8G8B8A8_SSCALED";
        MgFormat[MgFormat["R8G8B8A8_UINT"] = 41] = "R8G8B8A8_UINT";
        MgFormat[MgFormat["R8G8B8A8_SINT"] = 42] = "R8G8B8A8_SINT";
        MgFormat[MgFormat["R8G8B8A8_SRGB"] = 43] = "R8G8B8A8_SRGB";
        MgFormat[MgFormat["B8G8R8A8_UNORM"] = 44] = "B8G8R8A8_UNORM";
        MgFormat[MgFormat["B8G8R8A8_SNORM"] = 45] = "B8G8R8A8_SNORM";
        MgFormat[MgFormat["B8G8R8A8_USCALED"] = 46] = "B8G8R8A8_USCALED";
        MgFormat[MgFormat["B8G8R8A8_SSCALED"] = 47] = "B8G8R8A8_SSCALED";
        MgFormat[MgFormat["B8G8R8A8_UINT"] = 48] = "B8G8R8A8_UINT";
        MgFormat[MgFormat["B8G8R8A8_SINT"] = 49] = "B8G8R8A8_SINT";
        MgFormat[MgFormat["B8G8R8A8_SRGB"] = 50] = "B8G8R8A8_SRGB";
        MgFormat[MgFormat["A8B8G8R8_UNORM_PACK32"] = 51] = "A8B8G8R8_UNORM_PACK32";
        MgFormat[MgFormat["A8B8G8R8_SNORM_PACK32"] = 52] = "A8B8G8R8_SNORM_PACK32";
        MgFormat[MgFormat["A8B8G8R8_USCALED_PACK32"] = 53] = "A8B8G8R8_USCALED_PACK32";
        MgFormat[MgFormat["A8B8G8R8_SSCALED_PACK32"] = 54] = "A8B8G8R8_SSCALED_PACK32";
        MgFormat[MgFormat["A8B8G8R8_UINT_PACK32"] = 55] = "A8B8G8R8_UINT_PACK32";
        MgFormat[MgFormat["A8B8G8R8_SINT_PACK32"] = 56] = "A8B8G8R8_SINT_PACK32";
        MgFormat[MgFormat["A8B8G8R8_SRGB_PACK32"] = 57] = "A8B8G8R8_SRGB_PACK32";
        MgFormat[MgFormat["A2R10G10B10_UNORM_PACK32"] = 58] = "A2R10G10B10_UNORM_PACK32";
        MgFormat[MgFormat["A2R10G10B10_SNORM_PACK32"] = 59] = "A2R10G10B10_SNORM_PACK32";
        MgFormat[MgFormat["A2R10G10B10_USCALED_PACK32"] = 60] = "A2R10G10B10_USCALED_PACK32";
        MgFormat[MgFormat["A2R10G10B10_SSCALED_PACK32"] = 61] = "A2R10G10B10_SSCALED_PACK32";
        MgFormat[MgFormat["A2R10G10B10_UINT_PACK32"] = 62] = "A2R10G10B10_UINT_PACK32";
        MgFormat[MgFormat["A2R10G10B10_SINT_PACK32"] = 63] = "A2R10G10B10_SINT_PACK32";
        MgFormat[MgFormat["A2B10G10R10_UNORM_PACK32"] = 64] = "A2B10G10R10_UNORM_PACK32";
        MgFormat[MgFormat["A2B10G10R10_SNORM_PACK32"] = 65] = "A2B10G10R10_SNORM_PACK32";
        MgFormat[MgFormat["A2B10G10R10_USCALED_PACK32"] = 66] = "A2B10G10R10_USCALED_PACK32";
        MgFormat[MgFormat["A2B10G10R10_SSCALED_PACK32"] = 67] = "A2B10G10R10_SSCALED_PACK32";
        MgFormat[MgFormat["A2B10G10R10_UINT_PACK32"] = 68] = "A2B10G10R10_UINT_PACK32";
        MgFormat[MgFormat["A2B10G10R10_SINT_PACK32"] = 69] = "A2B10G10R10_SINT_PACK32";
        MgFormat[MgFormat["R16_UNORM"] = 70] = "R16_UNORM";
        MgFormat[MgFormat["R16_SNORM"] = 71] = "R16_SNORM";
        MgFormat[MgFormat["R16_USCALED"] = 72] = "R16_USCALED";
        MgFormat[MgFormat["R16_SSCALED"] = 73] = "R16_SSCALED";
        MgFormat[MgFormat["R16_UINT"] = 74] = "R16_UINT";
        MgFormat[MgFormat["R16_SINT"] = 75] = "R16_SINT";
        MgFormat[MgFormat["R16_SFLOAT"] = 76] = "R16_SFLOAT";
        MgFormat[MgFormat["R16G16_UNORM"] = 77] = "R16G16_UNORM";
        MgFormat[MgFormat["R16G16_SNORM"] = 78] = "R16G16_SNORM";
        MgFormat[MgFormat["R16G16_USCALED"] = 79] = "R16G16_USCALED";
        MgFormat[MgFormat["R16G16_SSCALED"] = 80] = "R16G16_SSCALED";
        MgFormat[MgFormat["R16G16_UINT"] = 81] = "R16G16_UINT";
        MgFormat[MgFormat["R16G16_SINT"] = 82] = "R16G16_SINT";
        MgFormat[MgFormat["R16G16_SFLOAT"] = 83] = "R16G16_SFLOAT";
        MgFormat[MgFormat["R16G16B16_UNORM"] = 84] = "R16G16B16_UNORM";
        MgFormat[MgFormat["R16G16B16_SNORM"] = 85] = "R16G16B16_SNORM";
        MgFormat[MgFormat["R16G16B16_USCALED"] = 86] = "R16G16B16_USCALED";
        MgFormat[MgFormat["R16G16B16_SSCALED"] = 87] = "R16G16B16_SSCALED";
        MgFormat[MgFormat["R16G16B16_UINT"] = 88] = "R16G16B16_UINT";
        MgFormat[MgFormat["R16G16B16_SINT"] = 89] = "R16G16B16_SINT";
        MgFormat[MgFormat["R16G16B16_SFLOAT"] = 90] = "R16G16B16_SFLOAT";
        MgFormat[MgFormat["R16G16B16A16_UNORM"] = 91] = "R16G16B16A16_UNORM";
        MgFormat[MgFormat["R16G16B16A16_SNORM"] = 92] = "R16G16B16A16_SNORM";
        MgFormat[MgFormat["R16G16B16A16_USCALED"] = 93] = "R16G16B16A16_USCALED";
        MgFormat[MgFormat["R16G16B16A16_SSCALED"] = 94] = "R16G16B16A16_SSCALED";
        MgFormat[MgFormat["R16G16B16A16_UINT"] = 95] = "R16G16B16A16_UINT";
        MgFormat[MgFormat["R16G16B16A16_SINT"] = 96] = "R16G16B16A16_SINT";
        MgFormat[MgFormat["R16G16B16A16_SFLOAT"] = 97] = "R16G16B16A16_SFLOAT";
        MgFormat[MgFormat["R32_UINT"] = 98] = "R32_UINT";
        MgFormat[MgFormat["R32_SINT"] = 99] = "R32_SINT";
        MgFormat[MgFormat["R32_SFLOAT"] = 100] = "R32_SFLOAT";
        MgFormat[MgFormat["R32G32_UINT"] = 101] = "R32G32_UINT";
        MgFormat[MgFormat["R32G32_SINT"] = 102] = "R32G32_SINT";
        MgFormat[MgFormat["R32G32_SFLOAT"] = 103] = "R32G32_SFLOAT";
        MgFormat[MgFormat["R32G32B32_UINT"] = 104] = "R32G32B32_UINT";
        MgFormat[MgFormat["R32G32B32_SINT"] = 105] = "R32G32B32_SINT";
        MgFormat[MgFormat["R32G32B32_SFLOAT"] = 106] = "R32G32B32_SFLOAT";
        MgFormat[MgFormat["R32G32B32A32_UINT"] = 107] = "R32G32B32A32_UINT";
        MgFormat[MgFormat["R32G32B32A32_SINT"] = 108] = "R32G32B32A32_SINT";
        MgFormat[MgFormat["R32G32B32A32_SFLOAT"] = 109] = "R32G32B32A32_SFLOAT";
        MgFormat[MgFormat["R64_UINT"] = 110] = "R64_UINT";
        MgFormat[MgFormat["R64_SINT"] = 111] = "R64_SINT";
        MgFormat[MgFormat["R64_SFLOAT"] = 112] = "R64_SFLOAT";
        MgFormat[MgFormat["R64G64_UINT"] = 113] = "R64G64_UINT";
        MgFormat[MgFormat["R64G64_SINT"] = 114] = "R64G64_SINT";
        MgFormat[MgFormat["R64G64_SFLOAT"] = 115] = "R64G64_SFLOAT";
        MgFormat[MgFormat["R64G64B64_UINT"] = 116] = "R64G64B64_UINT";
        MgFormat[MgFormat["R64G64B64_SINT"] = 117] = "R64G64B64_SINT";
        MgFormat[MgFormat["R64G64B64_SFLOAT"] = 118] = "R64G64B64_SFLOAT";
        MgFormat[MgFormat["R64G64B64A64_UINT"] = 119] = "R64G64B64A64_UINT";
        MgFormat[MgFormat["R64G64B64A64_SINT"] = 120] = "R64G64B64A64_SINT";
        MgFormat[MgFormat["R64G64B64A64_SFLOAT"] = 121] = "R64G64B64A64_SFLOAT";
        MgFormat[MgFormat["B10G11R11_UFLOAT_PACK32"] = 122] = "B10G11R11_UFLOAT_PACK32";
        MgFormat[MgFormat["E5B9G9R9_UFLOAT_PACK32"] = 123] = "E5B9G9R9_UFLOAT_PACK32";
        MgFormat[MgFormat["D16_UNORM"] = 124] = "D16_UNORM";
        MgFormat[MgFormat["X8_D24_UNORM_PACK32"] = 125] = "X8_D24_UNORM_PACK32";
        MgFormat[MgFormat["D32_SFLOAT"] = 126] = "D32_SFLOAT";
        MgFormat[MgFormat["S8_UINT"] = 127] = "S8_UINT";
        MgFormat[MgFormat["D16_UNORM_S8_UINT"] = 128] = "D16_UNORM_S8_UINT";
        MgFormat[MgFormat["D24_UNORM_S8_UINT"] = 129] = "D24_UNORM_S8_UINT";
        MgFormat[MgFormat["D32_SFLOAT_S8_UINT"] = 130] = "D32_SFLOAT_S8_UINT";
        MgFormat[MgFormat["BC1_RGB_UNORM_BLOCK"] = 131] = "BC1_RGB_UNORM_BLOCK";
        MgFormat[MgFormat["BC1_RGB_SRGB_BLOCK"] = 132] = "BC1_RGB_SRGB_BLOCK";
        MgFormat[MgFormat["BC1_RGBA_UNORM_BLOCK"] = 133] = "BC1_RGBA_UNORM_BLOCK";
        MgFormat[MgFormat["BC1_RGBA_SRGB_BLOCK"] = 134] = "BC1_RGBA_SRGB_BLOCK";
        MgFormat[MgFormat["BC2_UNORM_BLOCK"] = 135] = "BC2_UNORM_BLOCK";
        MgFormat[MgFormat["BC2_SRGB_BLOCK"] = 136] = "BC2_SRGB_BLOCK";
        MgFormat[MgFormat["BC3_UNORM_BLOCK"] = 137] = "BC3_UNORM_BLOCK";
        MgFormat[MgFormat["BC3_SRGB_BLOCK"] = 138] = "BC3_SRGB_BLOCK";
        MgFormat[MgFormat["BC4_UNORM_BLOCK"] = 139] = "BC4_UNORM_BLOCK";
        MgFormat[MgFormat["BC4_SNORM_BLOCK"] = 140] = "BC4_SNORM_BLOCK";
        MgFormat[MgFormat["BC5_UNORM_BLOCK"] = 141] = "BC5_UNORM_BLOCK";
        MgFormat[MgFormat["BC5_SNORM_BLOCK"] = 142] = "BC5_SNORM_BLOCK";
        MgFormat[MgFormat["BC6H_UFLOAT_BLOCK"] = 143] = "BC6H_UFLOAT_BLOCK";
        MgFormat[MgFormat["BC6H_SFLOAT_BLOCK"] = 144] = "BC6H_SFLOAT_BLOCK";
        MgFormat[MgFormat["BC7_UNORM_BLOCK"] = 145] = "BC7_UNORM_BLOCK";
        MgFormat[MgFormat["BC7_SRGB_BLOCK"] = 146] = "BC7_SRGB_BLOCK";
        MgFormat[MgFormat["ETC2_R8G8B8_UNORM_BLOCK"] = 147] = "ETC2_R8G8B8_UNORM_BLOCK";
        MgFormat[MgFormat["ETC2_R8G8B8_SRGB_BLOCK"] = 148] = "ETC2_R8G8B8_SRGB_BLOCK";
        MgFormat[MgFormat["ETC2_R8G8B8A1_UNORM_BLOCK"] = 149] = "ETC2_R8G8B8A1_UNORM_BLOCK";
        MgFormat[MgFormat["ETC2_R8G8B8A1_SRGB_BLOCK"] = 150] = "ETC2_R8G8B8A1_SRGB_BLOCK";
        MgFormat[MgFormat["ETC2_R8G8B8A8_UNORM_BLOCK"] = 151] = "ETC2_R8G8B8A8_UNORM_BLOCK";
        MgFormat[MgFormat["ETC2_R8G8B8A8_SRGB_BLOCK"] = 152] = "ETC2_R8G8B8A8_SRGB_BLOCK";
        MgFormat[MgFormat["EAC_R11_UNORM_BLOCK"] = 153] = "EAC_R11_UNORM_BLOCK";
        MgFormat[MgFormat["EAC_R11_SNORM_BLOCK"] = 154] = "EAC_R11_SNORM_BLOCK";
        MgFormat[MgFormat["EAC_R11G11_UNORM_BLOCK"] = 155] = "EAC_R11G11_UNORM_BLOCK";
        MgFormat[MgFormat["EAC_R11G11_SNORM_BLOCK"] = 156] = "EAC_R11G11_SNORM_BLOCK";
        MgFormat[MgFormat["ASTC_4x4_UNORM_BLOCK"] = 157] = "ASTC_4x4_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_4x4_SRGB_BLOCK"] = 158] = "ASTC_4x4_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_5x4_UNORM_BLOCK"] = 159] = "ASTC_5x4_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_5x4_SRGB_BLOCK"] = 160] = "ASTC_5x4_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_5x5_UNORM_BLOCK"] = 161] = "ASTC_5x5_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_5x5_SRGB_BLOCK"] = 162] = "ASTC_5x5_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_6x5_UNORM_BLOCK"] = 163] = "ASTC_6x5_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_6x5_SRGB_BLOCK"] = 164] = "ASTC_6x5_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_6x6_UNORM_BLOCK"] = 165] = "ASTC_6x6_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_6x6_SRGB_BLOCK"] = 166] = "ASTC_6x6_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_8x5_UNORM_BLOCK"] = 167] = "ASTC_8x5_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_8x5_SRGB_BLOCK"] = 168] = "ASTC_8x5_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_8x6_UNORM_BLOCK"] = 169] = "ASTC_8x6_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_8x6_SRGB_BLOCK"] = 170] = "ASTC_8x6_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_8x8_UNORM_BLOCK"] = 171] = "ASTC_8x8_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_8x8_SRGB_BLOCK"] = 172] = "ASTC_8x8_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_10x5_UNORM_BLOCK"] = 173] = "ASTC_10x5_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_10x5_SRGB_BLOCK"] = 174] = "ASTC_10x5_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_10x6_UNORM_BLOCK"] = 175] = "ASTC_10x6_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_10x6_SRGB_BLOCK"] = 176] = "ASTC_10x6_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_10x8_UNORM_BLOCK"] = 177] = "ASTC_10x8_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_10x8_SRGB_BLOCK"] = 178] = "ASTC_10x8_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_10x10_UNORM_BLOCK"] = 179] = "ASTC_10x10_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_10x10_SRGB_BLOCK"] = 180] = "ASTC_10x10_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_12x10_UNORM_BLOCK"] = 181] = "ASTC_12x10_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_12x10_SRGB_BLOCK"] = 182] = "ASTC_12x10_SRGB_BLOCK";
        MgFormat[MgFormat["ASTC_12x12_UNORM_BLOCK"] = 183] = "ASTC_12x12_UNORM_BLOCK";
        MgFormat[MgFormat["ASTC_12x12_SRGB_BLOCK"] = 184] = "ASTC_12x12_SRGB_BLOCK";
    })(MgFormat = Magnesium.MgFormat || (Magnesium.MgFormat = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgExtent3D = (function () {
        function MgExtent3D() {
        }
        return MgExtent3D;
    }());
    Magnesium.MgExtent3D = MgExtent3D;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSampleCountFlagBits;
    (function (MgSampleCountFlagBits) {
        MgSampleCountFlagBits[MgSampleCountFlagBits["COUNT_1_BIT"] = 1] = "COUNT_1_BIT";
        MgSampleCountFlagBits[MgSampleCountFlagBits["COUNT_2_BIT"] = 2] = "COUNT_2_BIT";
        MgSampleCountFlagBits[MgSampleCountFlagBits["COUNT_4_BIT"] = 4] = "COUNT_4_BIT";
        MgSampleCountFlagBits[MgSampleCountFlagBits["COUNT_8_BIT"] = 8] = "COUNT_8_BIT";
        MgSampleCountFlagBits[MgSampleCountFlagBits["COUNT_16_BIT"] = 16] = "COUNT_16_BIT";
        MgSampleCountFlagBits[MgSampleCountFlagBits["COUNT_32_BIT"] = 32] = "COUNT_32_BIT";
        MgSampleCountFlagBits[MgSampleCountFlagBits["COUNT_64_BIT"] = 64] = "COUNT_64_BIT";
    })(MgSampleCountFlagBits = Magnesium.MgSampleCountFlagBits || (Magnesium.MgSampleCountFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageTiling;
    (function (MgImageTiling) {
        MgImageTiling[MgImageTiling["OPTIMAL"] = 0] = "OPTIMAL";
        MgImageTiling[MgImageTiling["LINEAR"] = 1] = "LINEAR";
    })(MgImageTiling = Magnesium.MgImageTiling || (Magnesium.MgImageTiling = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageUsageFlagBits;
    (function (MgImageUsageFlagBits) {
        MgImageUsageFlagBits[MgImageUsageFlagBits["TRANSFER_SRC_BIT"] = 1] = "TRANSFER_SRC_BIT";
        MgImageUsageFlagBits[MgImageUsageFlagBits["TRANSFER_DST_BIT"] = 2] = "TRANSFER_DST_BIT";
        MgImageUsageFlagBits[MgImageUsageFlagBits["SAMPLED_BIT"] = 4] = "SAMPLED_BIT";
        MgImageUsageFlagBits[MgImageUsageFlagBits["STORAGE_BIT"] = 8] = "STORAGE_BIT";
        MgImageUsageFlagBits[MgImageUsageFlagBits["COLOR_ATTACHMENT_BIT"] = 16] = "COLOR_ATTACHMENT_BIT";
        MgImageUsageFlagBits[MgImageUsageFlagBits["DEPTH_STENCIL_ATTACHMENT_BIT"] = 32] = "DEPTH_STENCIL_ATTACHMENT_BIT";
        MgImageUsageFlagBits[MgImageUsageFlagBits["TRANSIENT_ATTACHMENT_BIT"] = 64] = "TRANSIENT_ATTACHMENT_BIT";
        MgImageUsageFlagBits[MgImageUsageFlagBits["INPUT_ATTACHMENT_BIT"] = 128] = "INPUT_ATTACHMENT_BIT";
    })(MgImageUsageFlagBits = Magnesium.MgImageUsageFlagBits || (Magnesium.MgImageUsageFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSharingMode;
    (function (MgSharingMode) {
        MgSharingMode[MgSharingMode["EXCLUSIVE"] = 0] = "EXCLUSIVE";
        MgSharingMode[MgSharingMode["CONCURRENT"] = 1] = "CONCURRENT";
    })(MgSharingMode = Magnesium.MgSharingMode || (Magnesium.MgSharingMode = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageLayout;
    (function (MgImageLayout) {
        MgImageLayout[MgImageLayout["UNDEFINED"] = 0] = "UNDEFINED";
        MgImageLayout[MgImageLayout["GENERAL"] = 1] = "GENERAL";
        MgImageLayout[MgImageLayout["COLOR_ATTACHMENT_OPTIMAL"] = 2] = "COLOR_ATTACHMENT_OPTIMAL";
        MgImageLayout[MgImageLayout["DEPTH_STENCIL_ATTACHMENT_OPTIMAL"] = 3] = "DEPTH_STENCIL_ATTACHMENT_OPTIMAL";
        MgImageLayout[MgImageLayout["DEPTH_STENCIL_READ_ONLY_OPTIMAL"] = 4] = "DEPTH_STENCIL_READ_ONLY_OPTIMAL";
        MgImageLayout[MgImageLayout["SHADER_READ_ONLY_OPTIMAL"] = 5] = "SHADER_READ_ONLY_OPTIMAL";
        MgImageLayout[MgImageLayout["TRANSFER_SRC_OPTIMAL"] = 6] = "TRANSFER_SRC_OPTIMAL";
        MgImageLayout[MgImageLayout["TRANSFER_DST_OPTIMAL"] = 7] = "TRANSFER_DST_OPTIMAL";
        MgImageLayout[MgImageLayout["PREINITIALIZED"] = 8] = "PREINITIALIZED";
        MgImageLayout[MgImageLayout["PRESENT_SRC_KHR"] = 1000001002] = "PRESENT_SRC_KHR";
    })(MgImageLayout = Magnesium.MgImageLayout || (Magnesium.MgImageLayout = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageCreateInfo = (function () {
        function MgImageCreateInfo() {
        }
        return MgImageCreateInfo;
    }());
    Magnesium.MgImageCreateInfo = MgImageCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageAspectFlagBits;
    (function (MgImageAspectFlagBits) {
        MgImageAspectFlagBits[MgImageAspectFlagBits["COLOR_BIT"] = 1] = "COLOR_BIT";
        MgImageAspectFlagBits[MgImageAspectFlagBits["DEPTH_BIT"] = 2] = "DEPTH_BIT";
        MgImageAspectFlagBits[MgImageAspectFlagBits["STENCIL_BIT"] = 4] = "STENCIL_BIT";
        MgImageAspectFlagBits[MgImageAspectFlagBits["METADATA_BIT"] = 8] = "METADATA_BIT";
    })(MgImageAspectFlagBits = Magnesium.MgImageAspectFlagBits || (Magnesium.MgImageAspectFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageSubresource = (function () {
        function MgImageSubresource() {
        }
        return MgImageSubresource;
    }());
    Magnesium.MgImageSubresource = MgImageSubresource;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgShaderModuleCreateInfo = (function () {
        function MgShaderModuleCreateInfo() {
        }
        return MgShaderModuleCreateInfo;
    }());
    Magnesium.MgShaderModuleCreateInfo = MgShaderModuleCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineCreateFlagBits;
    (function (MgPipelineCreateFlagBits) {
        MgPipelineCreateFlagBits[MgPipelineCreateFlagBits["DISABLE_OPTIMIZATION_BIT"] = 1] = "DISABLE_OPTIMIZATION_BIT";
        MgPipelineCreateFlagBits[MgPipelineCreateFlagBits["ALLOW_DERIVATIVES_BIT"] = 2] = "ALLOW_DERIVATIVES_BIT";
        MgPipelineCreateFlagBits[MgPipelineCreateFlagBits["DERIVATIVE_BIT"] = 4] = "DERIVATIVE_BIT";
    })(MgPipelineCreateFlagBits = Magnesium.MgPipelineCreateFlagBits || (Magnesium.MgPipelineCreateFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSpecializationMapEntry = (function () {
        function MgSpecializationMapEntry() {
        }
        return MgSpecializationMapEntry;
    }());
    Magnesium.MgSpecializationMapEntry = MgSpecializationMapEntry;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSpecializationInfo = (function () {
        function MgSpecializationInfo() {
        }
        return MgSpecializationInfo;
    }());
    Magnesium.MgSpecializationInfo = MgSpecializationInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineShaderStageCreateInfo = (function () {
        function MgPipelineShaderStageCreateInfo() {
        }
        return MgPipelineShaderStageCreateInfo;
    }());
    Magnesium.MgPipelineShaderStageCreateInfo = MgPipelineShaderStageCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgVertexInputRate;
    (function (MgVertexInputRate) {
        MgVertexInputRate[MgVertexInputRate["VERTEX"] = 0] = "VERTEX";
        MgVertexInputRate[MgVertexInputRate["INSTANCE"] = 1] = "INSTANCE";
    })(MgVertexInputRate = Magnesium.MgVertexInputRate || (Magnesium.MgVertexInputRate = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgVertexInputBindingDescription = (function () {
        function MgVertexInputBindingDescription() {
        }
        return MgVertexInputBindingDescription;
    }());
    Magnesium.MgVertexInputBindingDescription = MgVertexInputBindingDescription;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgVertexInputAttributeDescription = (function () {
        function MgVertexInputAttributeDescription() {
        }
        return MgVertexInputAttributeDescription;
    }());
    Magnesium.MgVertexInputAttributeDescription = MgVertexInputAttributeDescription;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineVertexInputStateCreateInfo = (function () {
        function MgPipelineVertexInputStateCreateInfo() {
        }
        return MgPipelineVertexInputStateCreateInfo;
    }());
    Magnesium.MgPipelineVertexInputStateCreateInfo = MgPipelineVertexInputStateCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPrimitiveTopology;
    (function (MgPrimitiveTopology) {
        MgPrimitiveTopology[MgPrimitiveTopology["POINT_LIST"] = 0] = "POINT_LIST";
        MgPrimitiveTopology[MgPrimitiveTopology["LINE_LIST"] = 1] = "LINE_LIST";
        MgPrimitiveTopology[MgPrimitiveTopology["LINE_STRIP"] = 2] = "LINE_STRIP";
        MgPrimitiveTopology[MgPrimitiveTopology["TRIANGLE_LIST"] = 3] = "TRIANGLE_LIST";
        MgPrimitiveTopology[MgPrimitiveTopology["TRIANGLE_STRIP"] = 4] = "TRIANGLE_STRIP";
        MgPrimitiveTopology[MgPrimitiveTopology["TRIANGLE_FAN"] = 5] = "TRIANGLE_FAN";
        MgPrimitiveTopology[MgPrimitiveTopology["LINE_LIST_WITH_ADJACENCY"] = 6] = "LINE_LIST_WITH_ADJACENCY";
        MgPrimitiveTopology[MgPrimitiveTopology["LINE_STRIP_WITH_ADJACENCY"] = 7] = "LINE_STRIP_WITH_ADJACENCY";
        MgPrimitiveTopology[MgPrimitiveTopology["TRIANGLE_LIST_WITH_ADJACENCY"] = 8] = "TRIANGLE_LIST_WITH_ADJACENCY";
        MgPrimitiveTopology[MgPrimitiveTopology["TRIANGLE_STRIP_WITH_ADJACENCY"] = 9] = "TRIANGLE_STRIP_WITH_ADJACENCY";
        MgPrimitiveTopology[MgPrimitiveTopology["PATCH_LIST"] = 10] = "PATCH_LIST";
    })(MgPrimitiveTopology = Magnesium.MgPrimitiveTopology || (Magnesium.MgPrimitiveTopology = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineInputAssemblyStateCreateInfo = (function () {
        function MgPipelineInputAssemblyStateCreateInfo() {
        }
        return MgPipelineInputAssemblyStateCreateInfo;
    }());
    Magnesium.MgPipelineInputAssemblyStateCreateInfo = MgPipelineInputAssemblyStateCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineTessellationStateCreateInfo = (function () {
        function MgPipelineTessellationStateCreateInfo() {
        }
        return MgPipelineTessellationStateCreateInfo;
    }());
    Magnesium.MgPipelineTessellationStateCreateInfo = MgPipelineTessellationStateCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgViewport = (function () {
        function MgViewport() {
        }
        return MgViewport;
    }());
    Magnesium.MgViewport = MgViewport;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgOffset2D = (function () {
        function MgOffset2D() {
        }
        return MgOffset2D;
    }());
    Magnesium.MgOffset2D = MgOffset2D;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgExtent2D = (function () {
        function MgExtent2D() {
        }
        return MgExtent2D;
    }());
    Magnesium.MgExtent2D = MgExtent2D;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgRect2D = (function () {
        function MgRect2D() {
        }
        return MgRect2D;
    }());
    Magnesium.MgRect2D = MgRect2D;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineViewportStateCreateInfo = (function () {
        function MgPipelineViewportStateCreateInfo() {
        }
        return MgPipelineViewportStateCreateInfo;
    }());
    Magnesium.MgPipelineViewportStateCreateInfo = MgPipelineViewportStateCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPolygonMode;
    (function (MgPolygonMode) {
        MgPolygonMode[MgPolygonMode["FILL"] = 0] = "FILL";
        MgPolygonMode[MgPolygonMode["LINE"] = 1] = "LINE";
        MgPolygonMode[MgPolygonMode["POINT"] = 2] = "POINT";
    })(MgPolygonMode = Magnesium.MgPolygonMode || (Magnesium.MgPolygonMode = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCullModeFlagBits;
    (function (MgCullModeFlagBits) {
        MgCullModeFlagBits[MgCullModeFlagBits["NONE"] = 0] = "NONE";
        MgCullModeFlagBits[MgCullModeFlagBits["FRONT_BIT"] = 1] = "FRONT_BIT";
        MgCullModeFlagBits[MgCullModeFlagBits["BACK_BIT"] = 2] = "BACK_BIT";
        MgCullModeFlagBits[MgCullModeFlagBits["FRONT_AND_BACK"] = 3] = "FRONT_AND_BACK";
    })(MgCullModeFlagBits = Magnesium.MgCullModeFlagBits || (Magnesium.MgCullModeFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgFrontFace;
    (function (MgFrontFace) {
        MgFrontFace[MgFrontFace["COUNTER_CLOCKWISE"] = 0] = "COUNTER_CLOCKWISE";
        MgFrontFace[MgFrontFace["CLOCKWISE"] = 1] = "CLOCKWISE";
    })(MgFrontFace = Magnesium.MgFrontFace || (Magnesium.MgFrontFace = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineRasterizationStateCreateInfo = (function () {
        function MgPipelineRasterizationStateCreateInfo() {
        }
        return MgPipelineRasterizationStateCreateInfo;
    }());
    Magnesium.MgPipelineRasterizationStateCreateInfo = MgPipelineRasterizationStateCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineMultisampleStateCreateInfo = (function () {
        function MgPipelineMultisampleStateCreateInfo() {
        }
        return MgPipelineMultisampleStateCreateInfo;
    }());
    Magnesium.MgPipelineMultisampleStateCreateInfo = MgPipelineMultisampleStateCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCompareOp;
    (function (MgCompareOp) {
        MgCompareOp[MgCompareOp["NEVER"] = 0] = "NEVER";
        MgCompareOp[MgCompareOp["LESS"] = 1] = "LESS";
        MgCompareOp[MgCompareOp["EQUAL"] = 2] = "EQUAL";
        MgCompareOp[MgCompareOp["LESS_OR_EQUAL"] = 3] = "LESS_OR_EQUAL";
        MgCompareOp[MgCompareOp["GREATER"] = 4] = "GREATER";
        MgCompareOp[MgCompareOp["NOT_EQUAL"] = 5] = "NOT_EQUAL";
        MgCompareOp[MgCompareOp["GREATER_OR_EQUAL"] = 6] = "GREATER_OR_EQUAL";
        MgCompareOp[MgCompareOp["ALWAYS"] = 7] = "ALWAYS";
    })(MgCompareOp = Magnesium.MgCompareOp || (Magnesium.MgCompareOp = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgStencilOp;
    (function (MgStencilOp) {
        MgStencilOp[MgStencilOp["KEEP"] = 0] = "KEEP";
        MgStencilOp[MgStencilOp["ZERO"] = 1] = "ZERO";
        MgStencilOp[MgStencilOp["REPLACE"] = 2] = "REPLACE";
        MgStencilOp[MgStencilOp["INCREMENT_AND_CLAMP"] = 3] = "INCREMENT_AND_CLAMP";
        MgStencilOp[MgStencilOp["DECREMENT_AND_CLAMP"] = 4] = "DECREMENT_AND_CLAMP";
        MgStencilOp[MgStencilOp["INVERT"] = 5] = "INVERT";
        MgStencilOp[MgStencilOp["INCREMENT_AND_WRAP"] = 6] = "INCREMENT_AND_WRAP";
        MgStencilOp[MgStencilOp["DECREMENT_AND_WRAP"] = 7] = "DECREMENT_AND_WRAP";
    })(MgStencilOp = Magnesium.MgStencilOp || (Magnesium.MgStencilOp = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgStencilOpState = (function () {
        function MgStencilOpState() {
        }
        return MgStencilOpState;
    }());
    Magnesium.MgStencilOpState = MgStencilOpState;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineDepthStencilStateCreateInfo = (function () {
        function MgPipelineDepthStencilStateCreateInfo() {
        }
        return MgPipelineDepthStencilStateCreateInfo;
    }());
    Magnesium.MgPipelineDepthStencilStateCreateInfo = MgPipelineDepthStencilStateCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgLogicOp;
    (function (MgLogicOp) {
        MgLogicOp[MgLogicOp["CLEAR"] = 0] = "CLEAR";
        MgLogicOp[MgLogicOp["AND"] = 1] = "AND";
        MgLogicOp[MgLogicOp["AND_REVERSE"] = 2] = "AND_REVERSE";
        MgLogicOp[MgLogicOp["COPY"] = 3] = "COPY";
        MgLogicOp[MgLogicOp["AND_INVERTED"] = 4] = "AND_INVERTED";
        MgLogicOp[MgLogicOp["NO_OP"] = 5] = "NO_OP";
        MgLogicOp[MgLogicOp["XOR"] = 6] = "XOR";
        MgLogicOp[MgLogicOp["OR"] = 7] = "OR";
        MgLogicOp[MgLogicOp["NOR"] = 8] = "NOR";
        MgLogicOp[MgLogicOp["EQUIVALENT"] = 9] = "EQUIVALENT";
        MgLogicOp[MgLogicOp["INVERT"] = 10] = "INVERT";
        MgLogicOp[MgLogicOp["OR_REVERSE"] = 11] = "OR_REVERSE";
        MgLogicOp[MgLogicOp["COPY_INVERTED"] = 12] = "COPY_INVERTED";
        MgLogicOp[MgLogicOp["OR_INVERTED"] = 13] = "OR_INVERTED";
        MgLogicOp[MgLogicOp["NAND"] = 14] = "NAND";
        MgLogicOp[MgLogicOp["SET"] = 15] = "SET";
    })(MgLogicOp = Magnesium.MgLogicOp || (Magnesium.MgLogicOp = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgBlendOp;
    (function (MgBlendOp) {
        MgBlendOp[MgBlendOp["ADD"] = 0] = "ADD";
        MgBlendOp[MgBlendOp["SUBTRACT"] = 1] = "SUBTRACT";
        MgBlendOp[MgBlendOp["REVERSE_SUBTRACT"] = 2] = "REVERSE_SUBTRACT";
        MgBlendOp[MgBlendOp["MIN"] = 3] = "MIN";
        MgBlendOp[MgBlendOp["MAX"] = 4] = "MAX";
    })(MgBlendOp = Magnesium.MgBlendOp || (Magnesium.MgBlendOp = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgColorComponentFlagBits;
    (function (MgColorComponentFlagBits) {
        MgColorComponentFlagBits[MgColorComponentFlagBits["R_BIT"] = 1] = "R_BIT";
        MgColorComponentFlagBits[MgColorComponentFlagBits["G_BIT"] = 2] = "G_BIT";
        MgColorComponentFlagBits[MgColorComponentFlagBits["B_BIT"] = 4] = "B_BIT";
        MgColorComponentFlagBits[MgColorComponentFlagBits["A_BIT"] = 8] = "A_BIT";
    })(MgColorComponentFlagBits = Magnesium.MgColorComponentFlagBits || (Magnesium.MgColorComponentFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgBlendFactor;
    (function (MgBlendFactor) {
        MgBlendFactor[MgBlendFactor["ZERO"] = 0] = "ZERO";
        MgBlendFactor[MgBlendFactor["ONE"] = 1] = "ONE";
        MgBlendFactor[MgBlendFactor["SRC_COLOR"] = 2] = "SRC_COLOR";
        MgBlendFactor[MgBlendFactor["ONE_MINUS_SRC_COLOR"] = 3] = "ONE_MINUS_SRC_COLOR";
        MgBlendFactor[MgBlendFactor["DST_COLOR"] = 4] = "DST_COLOR";
        MgBlendFactor[MgBlendFactor["ONE_MINUS_DST_COLOR"] = 5] = "ONE_MINUS_DST_COLOR";
        MgBlendFactor[MgBlendFactor["SRC_ALPHA"] = 6] = "SRC_ALPHA";
        MgBlendFactor[MgBlendFactor["ONE_MINUS_SRC_ALPHA"] = 7] = "ONE_MINUS_SRC_ALPHA";
        MgBlendFactor[MgBlendFactor["DST_ALPHA"] = 8] = "DST_ALPHA";
        MgBlendFactor[MgBlendFactor["ONE_MINUS_DST_ALPHA"] = 9] = "ONE_MINUS_DST_ALPHA";
        MgBlendFactor[MgBlendFactor["CONSTANT_COLOR"] = 10] = "CONSTANT_COLOR";
        MgBlendFactor[MgBlendFactor["ONE_MINUS_CONSTANT_COLOR"] = 11] = "ONE_MINUS_CONSTANT_COLOR";
        MgBlendFactor[MgBlendFactor["CONSTANT_ALPHA"] = 12] = "CONSTANT_ALPHA";
        MgBlendFactor[MgBlendFactor["ONE_MINUS_CONSTANT_ALPHA"] = 13] = "ONE_MINUS_CONSTANT_ALPHA";
        MgBlendFactor[MgBlendFactor["SRC_ALPHA_SATURATE"] = 14] = "SRC_ALPHA_SATURATE";
        MgBlendFactor[MgBlendFactor["SRC1_COLOR"] = 15] = "SRC1_COLOR";
        MgBlendFactor[MgBlendFactor["ONE_MINUS_SRC1_COLOR"] = 16] = "ONE_MINUS_SRC1_COLOR";
        MgBlendFactor[MgBlendFactor["SRC1_ALPHA"] = 17] = "SRC1_ALPHA";
        MgBlendFactor[MgBlendFactor["ONE_MINUS_SRC1_ALPHA"] = 18] = "ONE_MINUS_SRC1_ALPHA";
    })(MgBlendFactor = Magnesium.MgBlendFactor || (Magnesium.MgBlendFactor = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineColorBlendAttachmentState = (function () {
        function MgPipelineColorBlendAttachmentState() {
        }
        return MgPipelineColorBlendAttachmentState;
    }());
    Magnesium.MgPipelineColorBlendAttachmentState = MgPipelineColorBlendAttachmentState;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgColor4f = (function () {
        function MgColor4f(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        return MgColor4f;
    }());
    Magnesium.MgColor4f = MgColor4f;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineColorBlendStateCreateInfo = (function () {
        function MgPipelineColorBlendStateCreateInfo() {
        }
        return MgPipelineColorBlendStateCreateInfo;
    }());
    Magnesium.MgPipelineColorBlendStateCreateInfo = MgPipelineColorBlendStateCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDynamicState;
    (function (MgDynamicState) {
        MgDynamicState[MgDynamicState["VIEWPORT"] = 0] = "VIEWPORT";
        MgDynamicState[MgDynamicState["SCISSOR"] = 1] = "SCISSOR";
        MgDynamicState[MgDynamicState["LINE_WIDTH"] = 2] = "LINE_WIDTH";
        MgDynamicState[MgDynamicState["DEPTH_BIAS"] = 3] = "DEPTH_BIAS";
        MgDynamicState[MgDynamicState["BLEND_CONSTANTS"] = 4] = "BLEND_CONSTANTS";
        MgDynamicState[MgDynamicState["DEPTH_BOUNDS"] = 5] = "DEPTH_BOUNDS";
        MgDynamicState[MgDynamicState["STENCIL_COMPARE_MASK"] = 6] = "STENCIL_COMPARE_MASK";
        MgDynamicState[MgDynamicState["STENCIL_WRITE_MASK"] = 7] = "STENCIL_WRITE_MASK";
        MgDynamicState[MgDynamicState["STENCIL_REFERENCE"] = 8] = "STENCIL_REFERENCE";
    })(MgDynamicState = Magnesium.MgDynamicState || (Magnesium.MgDynamicState = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineDynamicStateCreateInfo = (function () {
        function MgPipelineDynamicStateCreateInfo() {
        }
        return MgPipelineDynamicStateCreateInfo;
    }());
    Magnesium.MgPipelineDynamicStateCreateInfo = MgPipelineDynamicStateCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgGraphicsPipelineCreateInfo = (function () {
        function MgGraphicsPipelineCreateInfo() {
        }
        return MgGraphicsPipelineCreateInfo;
    }());
    Magnesium.MgGraphicsPipelineCreateInfo = MgGraphicsPipelineCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgVec3Ui = (function () {
        function MgVec3Ui() {
        }
        return MgVec3Ui;
    }());
    Magnesium.MgVec3Ui = MgVec3Ui;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgComputePipelineCreateInfo = (function () {
        function MgComputePipelineCreateInfo() {
        }
        return MgComputePipelineCreateInfo;
    }());
    Magnesium.MgComputePipelineCreateInfo = MgComputePipelineCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgShaderStageFlagBits;
    (function (MgShaderStageFlagBits) {
        MgShaderStageFlagBits[MgShaderStageFlagBits["VERTEX_BIT"] = 1] = "VERTEX_BIT";
        MgShaderStageFlagBits[MgShaderStageFlagBits["TESSELLATION_CONTROL_BIT"] = 2] = "TESSELLATION_CONTROL_BIT";
        MgShaderStageFlagBits[MgShaderStageFlagBits["TESSELLATION_EVALUATION_BIT"] = 4] = "TESSELLATION_EVALUATION_BIT";
        MgShaderStageFlagBits[MgShaderStageFlagBits["GEOMETRY_BIT"] = 8] = "GEOMETRY_BIT";
        MgShaderStageFlagBits[MgShaderStageFlagBits["FRAGMENT_BIT"] = 16] = "FRAGMENT_BIT";
        MgShaderStageFlagBits[MgShaderStageFlagBits["COMPUTE_BIT"] = 32] = "COMPUTE_BIT";
        MgShaderStageFlagBits[MgShaderStageFlagBits["ALL_GRAPHICS"] = 31] = "ALL_GRAPHICS";
        MgShaderStageFlagBits[MgShaderStageFlagBits["ALL"] = 2147483647] = "ALL";
    })(MgShaderStageFlagBits = Magnesium.MgShaderStageFlagBits || (Magnesium.MgShaderStageFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPushConstantRange = (function () {
        function MgPushConstantRange() {
        }
        return MgPushConstantRange;
    }());
    Magnesium.MgPushConstantRange = MgPushConstantRange;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineLayoutCreateInfo = (function () {
        function MgPipelineLayoutCreateInfo() {
        }
        return MgPipelineLayoutCreateInfo;
    }());
    Magnesium.MgPipelineLayoutCreateInfo = MgPipelineLayoutCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgFilter;
    (function (MgFilter) {
        MgFilter[MgFilter["NEAREST"] = 0] = "NEAREST";
        MgFilter[MgFilter["LINEAR"] = 1] = "LINEAR";
    })(MgFilter = Magnesium.MgFilter || (Magnesium.MgFilter = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSamplerMipmapMode;
    (function (MgSamplerMipmapMode) {
        MgSamplerMipmapMode[MgSamplerMipmapMode["NEAREST"] = 0] = "NEAREST";
        MgSamplerMipmapMode[MgSamplerMipmapMode["LINEAR"] = 1] = "LINEAR";
    })(MgSamplerMipmapMode = Magnesium.MgSamplerMipmapMode || (Magnesium.MgSamplerMipmapMode = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSamplerAddressMode;
    (function (MgSamplerAddressMode) {
        MgSamplerAddressMode[MgSamplerAddressMode["REPEAT"] = 0] = "REPEAT";
        MgSamplerAddressMode[MgSamplerAddressMode["MIRRORED_REPEAT"] = 1] = "MIRRORED_REPEAT";
        MgSamplerAddressMode[MgSamplerAddressMode["CLAMP_TO_EDGE"] = 2] = "CLAMP_TO_EDGE";
        MgSamplerAddressMode[MgSamplerAddressMode["CLAMP_TO_BORDER"] = 3] = "CLAMP_TO_BORDER";
        MgSamplerAddressMode[MgSamplerAddressMode["MIRROR_CLAMP_TO_EDGE"] = 4] = "MIRROR_CLAMP_TO_EDGE";
    })(MgSamplerAddressMode = Magnesium.MgSamplerAddressMode || (Magnesium.MgSamplerAddressMode = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgBorderColor;
    (function (MgBorderColor) {
        MgBorderColor[MgBorderColor["FLOAT_TRANSPARENT_BLACK"] = 0] = "FLOAT_TRANSPARENT_BLACK";
        MgBorderColor[MgBorderColor["INT_TRANSPARENT_BLACK"] = 1] = "INT_TRANSPARENT_BLACK";
        MgBorderColor[MgBorderColor["FLOAT_OPAQUE_BLACK"] = 2] = "FLOAT_OPAQUE_BLACK";
        MgBorderColor[MgBorderColor["INT_OPAQUE_BLACK"] = 3] = "INT_OPAQUE_BLACK";
        MgBorderColor[MgBorderColor["FLOAT_OPAQUE_WHITE"] = 4] = "FLOAT_OPAQUE_WHITE";
        MgBorderColor[MgBorderColor["INT_OPAQUE_WHITE"] = 5] = "INT_OPAQUE_WHITE";
    })(MgBorderColor = Magnesium.MgBorderColor || (Magnesium.MgBorderColor = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSamplerCreateInfo = (function () {
        function MgSamplerCreateInfo() {
        }
        return MgSamplerCreateInfo;
    }());
    Magnesium.MgSamplerCreateInfo = MgSamplerCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDescriptorType;
    (function (MgDescriptorType) {
        MgDescriptorType[MgDescriptorType["SAMPLER"] = 0] = "SAMPLER";
        MgDescriptorType[MgDescriptorType["COMBINED_IMAGE_SAMPLER"] = 1] = "COMBINED_IMAGE_SAMPLER";
        MgDescriptorType[MgDescriptorType["SAMPLED_IMAGE"] = 2] = "SAMPLED_IMAGE";
        MgDescriptorType[MgDescriptorType["STORAGE_IMAGE"] = 3] = "STORAGE_IMAGE";
        MgDescriptorType[MgDescriptorType["UNIFORM_TEXEL_BUFFER"] = 4] = "UNIFORM_TEXEL_BUFFER";
        MgDescriptorType[MgDescriptorType["STORAGE_TEXEL_BUFFER"] = 5] = "STORAGE_TEXEL_BUFFER";
        MgDescriptorType[MgDescriptorType["UNIFORM_BUFFER"] = 6] = "UNIFORM_BUFFER";
        MgDescriptorType[MgDescriptorType["STORAGE_BUFFER"] = 7] = "STORAGE_BUFFER";
        MgDescriptorType[MgDescriptorType["UNIFORM_BUFFER_DYNAMIC"] = 8] = "UNIFORM_BUFFER_DYNAMIC";
        MgDescriptorType[MgDescriptorType["STORAGE_BUFFER_DYNAMIC"] = 9] = "STORAGE_BUFFER_DYNAMIC";
        MgDescriptorType[MgDescriptorType["INPUT_ATTACHMENT"] = 10] = "INPUT_ATTACHMENT";
    })(MgDescriptorType = Magnesium.MgDescriptorType || (Magnesium.MgDescriptorType = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDescriptorSetLayoutBinding = (function () {
        function MgDescriptorSetLayoutBinding() {
        }
        return MgDescriptorSetLayoutBinding;
    }());
    Magnesium.MgDescriptorSetLayoutBinding = MgDescriptorSetLayoutBinding;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDescriptorSetLayoutCreateInfo = (function () {
        function MgDescriptorSetLayoutCreateInfo() {
        }
        return MgDescriptorSetLayoutCreateInfo;
    }());
    Magnesium.MgDescriptorSetLayoutCreateInfo = MgDescriptorSetLayoutCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDescriptorPoolCreateFlagBits;
    (function (MgDescriptorPoolCreateFlagBits) {
        MgDescriptorPoolCreateFlagBits[MgDescriptorPoolCreateFlagBits["DESCRIPTOR_POOL_CREATE_FREE_DESCRIPTOR_SET_BIT"] = 1] = "DESCRIPTOR_POOL_CREATE_FREE_DESCRIPTOR_SET_BIT";
    })(MgDescriptorPoolCreateFlagBits = Magnesium.MgDescriptorPoolCreateFlagBits || (Magnesium.MgDescriptorPoolCreateFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDescriptorPoolSize = (function () {
        function MgDescriptorPoolSize() {
        }
        return MgDescriptorPoolSize;
    }());
    Magnesium.MgDescriptorPoolSize = MgDescriptorPoolSize;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDescriptorPoolCreateInfo = (function () {
        function MgDescriptorPoolCreateInfo() {
        }
        return MgDescriptorPoolCreateInfo;
    }());
    Magnesium.MgDescriptorPoolCreateInfo = MgDescriptorPoolCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSubresourceLayout = (function () {
        function MgSubresourceLayout() {
        }
        return MgSubresourceLayout;
    }());
    Magnesium.MgSubresourceLayout = MgSubresourceLayout;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageViewType;
    (function (MgImageViewType) {
        MgImageViewType[MgImageViewType["TYPE_1D"] = 0] = "TYPE_1D";
        MgImageViewType[MgImageViewType["TYPE_2D"] = 1] = "TYPE_2D";
        MgImageViewType[MgImageViewType["TYPE_3D"] = 2] = "TYPE_3D";
        MgImageViewType[MgImageViewType["TYPE_CUBE"] = 3] = "TYPE_CUBE";
        MgImageViewType[MgImageViewType["TYPE_1D_ARRAY"] = 4] = "TYPE_1D_ARRAY";
        MgImageViewType[MgImageViewType["TYPE_2D_ARRAY"] = 5] = "TYPE_2D_ARRAY";
        MgImageViewType[MgImageViewType["TYPE_CUBE_ARRAY"] = 6] = "TYPE_CUBE_ARRAY";
    })(MgImageViewType = Magnesium.MgImageViewType || (Magnesium.MgImageViewType = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgComponentSwizzle;
    (function (MgComponentSwizzle) {
        MgComponentSwizzle[MgComponentSwizzle["IDENTITY"] = 0] = "IDENTITY";
        MgComponentSwizzle[MgComponentSwizzle["ZERO"] = 1] = "ZERO";
        MgComponentSwizzle[MgComponentSwizzle["ONE"] = 2] = "ONE";
        MgComponentSwizzle[MgComponentSwizzle["R"] = 3] = "R";
        MgComponentSwizzle[MgComponentSwizzle["G"] = 4] = "G";
        MgComponentSwizzle[MgComponentSwizzle["B"] = 5] = "B";
        MgComponentSwizzle[MgComponentSwizzle["A"] = 6] = "A";
    })(MgComponentSwizzle = Magnesium.MgComponentSwizzle || (Magnesium.MgComponentSwizzle = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgComponentMapping = (function () {
        function MgComponentMapping() {
        }
        return MgComponentMapping;
    }());
    Magnesium.MgComponentMapping = MgComponentMapping;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageSubresourceRange = (function () {
        function MgImageSubresourceRange() {
        }
        return MgImageSubresourceRange;
    }());
    Magnesium.MgImageSubresourceRange = MgImageSubresourceRange;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageViewCreateInfo = (function () {
        function MgImageViewCreateInfo() {
        }
        return MgImageViewCreateInfo;
    }());
    Magnesium.MgImageViewCreateInfo = MgImageViewCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDescriptorSetAllocateInfo = (function () {
        function MgDescriptorSetAllocateInfo() {
        }
        return MgDescriptorSetAllocateInfo;
    }());
    Magnesium.MgDescriptorSetAllocateInfo = MgDescriptorSetAllocateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCopyDescriptorSet = (function () {
        function MgCopyDescriptorSet() {
        }
        return MgCopyDescriptorSet;
    }());
    Magnesium.MgCopyDescriptorSet = MgCopyDescriptorSet;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgFramebufferCreateInfo = (function () {
        function MgFramebufferCreateInfo() {
        }
        return MgFramebufferCreateInfo;
    }());
    Magnesium.MgFramebufferCreateInfo = MgFramebufferCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgAttachmentDescriptionFlagBits;
    (function (MgAttachmentDescriptionFlagBits) {
        MgAttachmentDescriptionFlagBits[MgAttachmentDescriptionFlagBits["ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT"] = 1] = "ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT";
    })(MgAttachmentDescriptionFlagBits = Magnesium.MgAttachmentDescriptionFlagBits || (Magnesium.MgAttachmentDescriptionFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgAttachmentLoadOp;
    (function (MgAttachmentLoadOp) {
        MgAttachmentLoadOp[MgAttachmentLoadOp["LOAD"] = 0] = "LOAD";
        MgAttachmentLoadOp[MgAttachmentLoadOp["CLEAR"] = 1] = "CLEAR";
        MgAttachmentLoadOp[MgAttachmentLoadOp["DONT_CARE"] = 2] = "DONT_CARE";
    })(MgAttachmentLoadOp = Magnesium.MgAttachmentLoadOp || (Magnesium.MgAttachmentLoadOp = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgAttachmentStoreOp;
    (function (MgAttachmentStoreOp) {
        MgAttachmentStoreOp[MgAttachmentStoreOp["STORE"] = 0] = "STORE";
        MgAttachmentStoreOp[MgAttachmentStoreOp["DONT_CARE"] = 1] = "DONT_CARE";
    })(MgAttachmentStoreOp = Magnesium.MgAttachmentStoreOp || (Magnesium.MgAttachmentStoreOp = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgAttachmentDescription = (function () {
        function MgAttachmentDescription() {
        }
        return MgAttachmentDescription;
    }());
    Magnesium.MgAttachmentDescription = MgAttachmentDescription;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgAttachmentReference = (function () {
        function MgAttachmentReference() {
        }
        return MgAttachmentReference;
    }());
    Magnesium.MgAttachmentReference = MgAttachmentReference;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineBindPoint;
    (function (MgPipelineBindPoint) {
        MgPipelineBindPoint[MgPipelineBindPoint["GRAPHICS"] = 0] = "GRAPHICS";
        MgPipelineBindPoint[MgPipelineBindPoint["COMPUTE"] = 1] = "COMPUTE";
    })(MgPipelineBindPoint = Magnesium.MgPipelineBindPoint || (Magnesium.MgPipelineBindPoint = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSubpassDescription = (function () {
        function MgSubpassDescription() {
        }
        return MgSubpassDescription;
    }());
    Magnesium.MgSubpassDescription = MgSubpassDescription;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDependencyFlagBits;
    (function (MgDependencyFlagBits) {
        MgDependencyFlagBits[MgDependencyFlagBits["VK_DEPENDENCY_BY_REGION_BIT"] = 1] = "VK_DEPENDENCY_BY_REGION_BIT";
    })(MgDependencyFlagBits = Magnesium.MgDependencyFlagBits || (Magnesium.MgDependencyFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPipelineStageFlagBits;
    (function (MgPipelineStageFlagBits) {
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["TOP_OF_PIPE_BIT"] = 1] = "TOP_OF_PIPE_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["DRAW_INDIRECT_BIT"] = 2] = "DRAW_INDIRECT_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["VERTEX_INPUT_BIT"] = 4] = "VERTEX_INPUT_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["VERTEX_SHADER_BIT"] = 8] = "VERTEX_SHADER_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["TESSELLATION_CONTROL_SHADER_BIT"] = 16] = "TESSELLATION_CONTROL_SHADER_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["TESSELLATION_EVALUATION_SHADER_BIT"] = 32] = "TESSELLATION_EVALUATION_SHADER_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["GEOMETRY_SHADER_BIT"] = 64] = "GEOMETRY_SHADER_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["FRAGMENT_SHADER_BIT"] = 128] = "FRAGMENT_SHADER_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["EARLY_FRAGMENT_TESTS_BIT"] = 256] = "EARLY_FRAGMENT_TESTS_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["LATE_FRAGMENT_TESTS_BIT"] = 512] = "LATE_FRAGMENT_TESTS_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["COLOR_ATTACHMENT_OUTPUT_BIT"] = 1024] = "COLOR_ATTACHMENT_OUTPUT_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["COMPUTE_SHADER_BIT"] = 2048] = "COMPUTE_SHADER_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["TRANSFER_BIT"] = 4096] = "TRANSFER_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["BOTTOM_OF_PIPE_BIT"] = 8192] = "BOTTOM_OF_PIPE_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["HOST_BIT"] = 16384] = "HOST_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["ALL_GRAPHICS_BIT"] = 32768] = "ALL_GRAPHICS_BIT";
        MgPipelineStageFlagBits[MgPipelineStageFlagBits["ALL_COMMANDS_BIT"] = 65536] = "ALL_COMMANDS_BIT";
    })(MgPipelineStageFlagBits = Magnesium.MgPipelineStageFlagBits || (Magnesium.MgPipelineStageFlagBits = {}));
    ;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgAccessFlagBits;
    (function (MgAccessFlagBits) {
        MgAccessFlagBits[MgAccessFlagBits["INDIRECT_COMMAND_READ_BIT"] = 1] = "INDIRECT_COMMAND_READ_BIT";
        MgAccessFlagBits[MgAccessFlagBits["INDEX_READ_BIT"] = 2] = "INDEX_READ_BIT";
        MgAccessFlagBits[MgAccessFlagBits["VERTEX_ATTRIBUTE_READ_BIT"] = 4] = "VERTEX_ATTRIBUTE_READ_BIT";
        MgAccessFlagBits[MgAccessFlagBits["UNIFORM_READ_BIT"] = 8] = "UNIFORM_READ_BIT";
        MgAccessFlagBits[MgAccessFlagBits["INPUT_ATTACHMENT_READ_BIT"] = 16] = "INPUT_ATTACHMENT_READ_BIT";
        MgAccessFlagBits[MgAccessFlagBits["SHADER_READ_BIT"] = 32] = "SHADER_READ_BIT";
        MgAccessFlagBits[MgAccessFlagBits["SHADER_WRITE_BIT"] = 64] = "SHADER_WRITE_BIT";
        MgAccessFlagBits[MgAccessFlagBits["COLOR_ATTACHMENT_READ_BIT"] = 128] = "COLOR_ATTACHMENT_READ_BIT";
        MgAccessFlagBits[MgAccessFlagBits["COLOR_ATTACHMENT_WRITE_BIT"] = 256] = "COLOR_ATTACHMENT_WRITE_BIT";
        MgAccessFlagBits[MgAccessFlagBits["DEPTH_STENCIL_ATTACHMENT_READ_BIT"] = 512] = "DEPTH_STENCIL_ATTACHMENT_READ_BIT";
        MgAccessFlagBits[MgAccessFlagBits["DEPTH_STENCIL_ATTACHMENT_WRITE_BIT"] = 1024] = "DEPTH_STENCIL_ATTACHMENT_WRITE_BIT";
        MgAccessFlagBits[MgAccessFlagBits["TRANSFER_READ_BIT"] = 2048] = "TRANSFER_READ_BIT";
        MgAccessFlagBits[MgAccessFlagBits["TRANSFER_WRITE_BIT"] = 4096] = "TRANSFER_WRITE_BIT";
        MgAccessFlagBits[MgAccessFlagBits["HOST_READ_BIT"] = 8192] = "HOST_READ_BIT";
        MgAccessFlagBits[MgAccessFlagBits["HOST_WRITE_BIT"] = 16384] = "HOST_WRITE_BIT";
        MgAccessFlagBits[MgAccessFlagBits["MEMORY_READ_BIT"] = 32768] = "MEMORY_READ_BIT";
        MgAccessFlagBits[MgAccessFlagBits["MEMORY_WRITE_BIT"] = 65536] = "MEMORY_WRITE_BIT";
    })(MgAccessFlagBits = Magnesium.MgAccessFlagBits || (Magnesium.MgAccessFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSubpassDependency = (function () {
        function MgSubpassDependency() {
        }
        return MgSubpassDependency;
    }());
    Magnesium.MgSubpassDependency = MgSubpassDependency;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgRenderPassCreateInfo = (function () {
        function MgRenderPassCreateInfo() {
        }
        return MgRenderPassCreateInfo;
    }());
    Magnesium.MgRenderPassCreateInfo = MgRenderPassCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCommandPoolCreateInfo = (function () {
        function MgCommandPoolCreateInfo() {
        }
        return MgCommandPoolCreateInfo;
    }());
    Magnesium.MgCommandPoolCreateInfo = MgCommandPoolCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCommandPoolResetFlagBits;
    (function (MgCommandPoolResetFlagBits) {
        MgCommandPoolResetFlagBits[MgCommandPoolResetFlagBits["RELEASE_RESOURCES_BIT"] = 1] = "RELEASE_RESOURCES_BIT";
    })(MgCommandPoolResetFlagBits = Magnesium.MgCommandPoolResetFlagBits || (Magnesium.MgCommandPoolResetFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCommandBufferUsageFlagBits;
    (function (MgCommandBufferUsageFlagBits) {
        MgCommandBufferUsageFlagBits[MgCommandBufferUsageFlagBits["ONE_TIME_SUBMIT_BIT"] = 1] = "ONE_TIME_SUBMIT_BIT";
        MgCommandBufferUsageFlagBits[MgCommandBufferUsageFlagBits["RENDER_PASS_CONTINUE_BIT"] = 2] = "RENDER_PASS_CONTINUE_BIT";
        MgCommandBufferUsageFlagBits[MgCommandBufferUsageFlagBits["SIMULTANEOUS_USE_BIT"] = 4] = "SIMULTANEOUS_USE_BIT";
    })(MgCommandBufferUsageFlagBits = Magnesium.MgCommandBufferUsageFlagBits || (Magnesium.MgCommandBufferUsageFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgQueryControlFlagBits;
    (function (MgQueryControlFlagBits) {
        MgQueryControlFlagBits[MgQueryControlFlagBits["PRECISE_BIT"] = 1] = "PRECISE_BIT";
    })(MgQueryControlFlagBits = Magnesium.MgQueryControlFlagBits || (Magnesium.MgQueryControlFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgQueryPipelineStatisticFlagBits;
    (function (MgQueryPipelineStatisticFlagBits) {
        MgQueryPipelineStatisticFlagBits[MgQueryPipelineStatisticFlagBits["INPUT_ASSEMBLY_VERTICES_BIT"] = 1] = "INPUT_ASSEMBLY_VERTICES_BIT";
        MgQueryPipelineStatisticFlagBits[MgQueryPipelineStatisticFlagBits["INPUT_ASSEMBLY_PRIMITIVES_BIT"] = 2] = "INPUT_ASSEMBLY_PRIMITIVES_BIT";
        MgQueryPipelineStatisticFlagBits[MgQueryPipelineStatisticFlagBits["VERTEX_SHADER_INVOCATIONS_BIT"] = 4] = "VERTEX_SHADER_INVOCATIONS_BIT";
        MgQueryPipelineStatisticFlagBits[MgQueryPipelineStatisticFlagBits["GEOMETRY_SHADER_INVOCATIONS_BIT"] = 8] = "GEOMETRY_SHADER_INVOCATIONS_BIT";
        MgQueryPipelineStatisticFlagBits[MgQueryPipelineStatisticFlagBits["GEOMETRY_SHADER_PRIMITIVES_BIT"] = 16] = "GEOMETRY_SHADER_PRIMITIVES_BIT";
        MgQueryPipelineStatisticFlagBits[MgQueryPipelineStatisticFlagBits["CLIPPING_INVOCATIONS_BIT"] = 32] = "CLIPPING_INVOCATIONS_BIT";
        MgQueryPipelineStatisticFlagBits[MgQueryPipelineStatisticFlagBits["CLIPPING_PRIMITIVES_BIT"] = 64] = "CLIPPING_PRIMITIVES_BIT";
        MgQueryPipelineStatisticFlagBits[MgQueryPipelineStatisticFlagBits["FRAGMENT_SHADER_INVOCATIONS_BIT"] = 128] = "FRAGMENT_SHADER_INVOCATIONS_BIT";
        MgQueryPipelineStatisticFlagBits[MgQueryPipelineStatisticFlagBits["TESSELLATION_CONTROL_SHADER_PATCHES_BIT"] = 256] = "TESSELLATION_CONTROL_SHADER_PATCHES_BIT";
        MgQueryPipelineStatisticFlagBits[MgQueryPipelineStatisticFlagBits["TESSELLATION_EVALUATION_SHADER_INVOCATIONS_BIT"] = 512] = "TESSELLATION_EVALUATION_SHADER_INVOCATIONS_BIT";
        MgQueryPipelineStatisticFlagBits[MgQueryPipelineStatisticFlagBits["COMPUTE_SHADER_INVOCATIONS_BIT"] = 1024] = "COMPUTE_SHADER_INVOCATIONS_BIT";
    })(MgQueryPipelineStatisticFlagBits = Magnesium.MgQueryPipelineStatisticFlagBits || (Magnesium.MgQueryPipelineStatisticFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCommandBufferInheritanceInfo = (function () {
        function MgCommandBufferInheritanceInfo() {
        }
        return MgCommandBufferInheritanceInfo;
    }());
    Magnesium.MgCommandBufferInheritanceInfo = MgCommandBufferInheritanceInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCommandBufferBeginInfo = (function () {
        function MgCommandBufferBeginInfo() {
        }
        return MgCommandBufferBeginInfo;
    }());
    Magnesium.MgCommandBufferBeginInfo = MgCommandBufferBeginInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCommandBufferResetFlagBits;
    (function (MgCommandBufferResetFlagBits) {
        MgCommandBufferResetFlagBits[MgCommandBufferResetFlagBits["RELEASE_RESOURCES_BIT"] = 1] = "RELEASE_RESOURCES_BIT";
    })(MgCommandBufferResetFlagBits = Magnesium.MgCommandBufferResetFlagBits || (Magnesium.MgCommandBufferResetFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgStencilFaceFlagBits;
    (function (MgStencilFaceFlagBits) {
        MgStencilFaceFlagBits[MgStencilFaceFlagBits["FRONT_BIT"] = 1] = "FRONT_BIT";
        MgStencilFaceFlagBits[MgStencilFaceFlagBits["BACK_BIT"] = 2] = "BACK_BIT";
        MgStencilFaceFlagBits[MgStencilFaceFlagBits["FRONT_AND_BACK"] = 3] = "FRONT_AND_BACK";
    })(MgStencilFaceFlagBits = Magnesium.MgStencilFaceFlagBits || (Magnesium.MgStencilFaceFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgIndexType;
    (function (MgIndexType) {
        MgIndexType[MgIndexType["UINT16"] = 0] = "UINT16";
        MgIndexType[MgIndexType["UINT32"] = 1] = "UINT32";
    })(MgIndexType = Magnesium.MgIndexType || (Magnesium.MgIndexType = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgBufferCopy = (function () {
        function MgBufferCopy() {
        }
        return MgBufferCopy;
    }());
    Magnesium.MgBufferCopy = MgBufferCopy;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgOffset3D = (function () {
        function MgOffset3D() {
        }
        return MgOffset3D;
    }());
    Magnesium.MgOffset3D = MgOffset3D;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageSubresourceLayers = (function () {
        function MgImageSubresourceLayers() {
        }
        return MgImageSubresourceLayers;
    }());
    Magnesium.MgImageSubresourceLayers = MgImageSubresourceLayers;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageCopy = (function () {
        function MgImageCopy() {
        }
        return MgImageCopy;
    }());
    Magnesium.MgImageCopy = MgImageCopy;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageBlit = (function () {
        function MgImageBlit() {
        }
        return MgImageBlit;
    }());
    Magnesium.MgImageBlit = MgImageBlit;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgBufferImageCopy = (function () {
        function MgBufferImageCopy() {
        }
        return MgBufferImageCopy;
    }());
    Magnesium.MgBufferImageCopy = MgBufferImageCopy;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgVec4i = (function () {
        function MgVec4i(x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        return MgVec4i;
    }());
    Magnesium.MgVec4i = MgVec4i;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgVec4Ui = (function () {
        function MgVec4Ui(x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        return MgVec4Ui;
    }());
    Magnesium.MgVec4Ui = MgVec4Ui;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgClearColorValue = (function () {
        function MgClearColorValue() {
        }
        Object.defineProperty(MgClearColorValue.prototype, "float32", {
            get: function () {
                return this.mValue;
            },
            set: function (value) {
                this.mValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MgClearColorValue.prototype, "int32", {
            get: function () {
                return this.mValue;
            },
            set: function (value) {
                this.mValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MgClearColorValue.prototype, "uint32", {
            get: function () {
                return this.mValue;
            },
            set: function (value) {
                this.mValue = value;
            },
            enumerable: true,
            configurable: true
        });
        return MgClearColorValue;
    }());
    Magnesium.MgClearColorValue = MgClearColorValue;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgClearDepthStencilValue = (function () {
        function MgClearDepthStencilValue() {
        }
        return MgClearDepthStencilValue;
    }());
    Magnesium.MgClearDepthStencilValue = MgClearDepthStencilValue;
})(Magnesium || (Magnesium = {}));
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
var Magnesium;
(function (Magnesium) {
    var MgClearAttachment = (function () {
        function MgClearAttachment() {
        }
        return MgClearAttachment;
    }());
    Magnesium.MgClearAttachment = MgClearAttachment;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgQueryResultFlagBits;
    (function (MgQueryResultFlagBits) {
        MgQueryResultFlagBits[MgQueryResultFlagBits["RESULT_64_BIT"] = 1] = "RESULT_64_BIT";
        MgQueryResultFlagBits[MgQueryResultFlagBits["RESULT_WAIT_BIT"] = 2] = "RESULT_WAIT_BIT";
        MgQueryResultFlagBits[MgQueryResultFlagBits["RESULT_WITH_AVAILABILITY_BIT"] = 4] = "RESULT_WITH_AVAILABILITY_BIT";
        MgQueryResultFlagBits[MgQueryResultFlagBits["RESULT_PARTIAL_BIT"] = 8] = "RESULT_PARTIAL_BIT";
    })(MgQueryResultFlagBits = Magnesium.MgQueryResultFlagBits || (Magnesium.MgQueryResultFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgRenderPassBeginInfo = (function () {
        function MgRenderPassBeginInfo() {
        }
        return MgRenderPassBeginInfo;
    }());
    Magnesium.MgRenderPassBeginInfo = MgRenderPassBeginInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSubpassContents;
    (function (MgSubpassContents) {
        MgSubpassContents[MgSubpassContents["INLINE"] = 0] = "INLINE";
        MgSubpassContents[MgSubpassContents["SECONDARY_COMMAND_BUFFERS"] = 1] = "SECONDARY_COMMAND_BUFFERS";
    })(MgSubpassContents = Magnesium.MgSubpassContents || (Magnesium.MgSubpassContents = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageMemoryBarrier = (function () {
        function MgImageMemoryBarrier() {
        }
        return MgImageMemoryBarrier;
    }());
    Magnesium.MgImageMemoryBarrier = MgImageMemoryBarrier;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgBufferMemoryBarrier = (function () {
        function MgBufferMemoryBarrier() {
        }
        return MgBufferMemoryBarrier;
    }());
    Magnesium.MgBufferMemoryBarrier = MgBufferMemoryBarrier;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgMemoryBarrier = (function () {
        function MgMemoryBarrier() {
        }
        return MgMemoryBarrier;
    }());
    Magnesium.MgMemoryBarrier = MgMemoryBarrier;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgClearRect = (function () {
        function MgClearRect() {
        }
        return MgClearRect;
    }());
    Magnesium.MgClearRect = MgClearRect;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageResolve = (function () {
        function MgImageResolve() {
        }
        return MgImageResolve;
    }());
    Magnesium.MgImageResolve = MgImageResolve;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPresentModeKHR;
    (function (MgPresentModeKHR) {
        MgPresentModeKHR[MgPresentModeKHR["IMMEDIATE_KHR"] = 0] = "IMMEDIATE_KHR";
        MgPresentModeKHR[MgPresentModeKHR["MAILBOX_KHR"] = 1] = "MAILBOX_KHR";
        MgPresentModeKHR[MgPresentModeKHR["FIFO_KHR"] = 2] = "FIFO_KHR";
        MgPresentModeKHR[MgPresentModeKHR["FIFO_RELAXED_KHR"] = 3] = "FIFO_RELAXED_KHR";
    })(MgPresentModeKHR = Magnesium.MgPresentModeKHR || (Magnesium.MgPresentModeKHR = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSurfaceTransformFlagBitsKHR;
    (function (MgSurfaceTransformFlagBitsKHR) {
        MgSurfaceTransformFlagBitsKHR[MgSurfaceTransformFlagBitsKHR["IDENTITY_BIT_KHR"] = 1] = "IDENTITY_BIT_KHR";
        MgSurfaceTransformFlagBitsKHR[MgSurfaceTransformFlagBitsKHR["ROTATE_90_BIT_KHR"] = 2] = "ROTATE_90_BIT_KHR";
        MgSurfaceTransformFlagBitsKHR[MgSurfaceTransformFlagBitsKHR["ROTATE_180_BIT_KHR"] = 4] = "ROTATE_180_BIT_KHR";
        MgSurfaceTransformFlagBitsKHR[MgSurfaceTransformFlagBitsKHR["ROTATE_270_BIT_KHR"] = 8] = "ROTATE_270_BIT_KHR";
        MgSurfaceTransformFlagBitsKHR[MgSurfaceTransformFlagBitsKHR["HORIZONTAL_MIRROR_BIT_KHR"] = 16] = "HORIZONTAL_MIRROR_BIT_KHR";
        MgSurfaceTransformFlagBitsKHR[MgSurfaceTransformFlagBitsKHR["HORIZONTAL_MIRROR_ROTATE_90_BIT_KHR"] = 32] = "HORIZONTAL_MIRROR_ROTATE_90_BIT_KHR";
        MgSurfaceTransformFlagBitsKHR[MgSurfaceTransformFlagBitsKHR["HORIZONTAL_MIRROR_ROTATE_180_BIT_KHR"] = 64] = "HORIZONTAL_MIRROR_ROTATE_180_BIT_KHR";
        MgSurfaceTransformFlagBitsKHR[MgSurfaceTransformFlagBitsKHR["HORIZONTAL_MIRROR_ROTATE_270_BIT_KHR"] = 128] = "HORIZONTAL_MIRROR_ROTATE_270_BIT_KHR";
        MgSurfaceTransformFlagBitsKHR[MgSurfaceTransformFlagBitsKHR["INHERIT_BIT_KHR"] = 256] = "INHERIT_BIT_KHR";
    })(MgSurfaceTransformFlagBitsKHR = Magnesium.MgSurfaceTransformFlagBitsKHR || (Magnesium.MgSurfaceTransformFlagBitsKHR = {}));
    ;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCompositeAlphaFlagBitsKHR;
    (function (MgCompositeAlphaFlagBitsKHR) {
        MgCompositeAlphaFlagBitsKHR[MgCompositeAlphaFlagBitsKHR["OPAQUE_BIT_KHR"] = 1] = "OPAQUE_BIT_KHR";
        MgCompositeAlphaFlagBitsKHR[MgCompositeAlphaFlagBitsKHR["PRE_MULTIPLIED_BIT_KHR"] = 2] = "PRE_MULTIPLIED_BIT_KHR";
        MgCompositeAlphaFlagBitsKHR[MgCompositeAlphaFlagBitsKHR["POST_MULTIPLIED_BIT_KHR"] = 4] = "POST_MULTIPLIED_BIT_KHR";
        MgCompositeAlphaFlagBitsKHR[MgCompositeAlphaFlagBitsKHR["INHERIT_BIT_KHR"] = 8] = "INHERIT_BIT_KHR";
    })(MgCompositeAlphaFlagBitsKHR = Magnesium.MgCompositeAlphaFlagBitsKHR || (Magnesium.MgCompositeAlphaFlagBitsKHR = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgColorSpaceKHR;
    (function (MgColorSpaceKHR) {
        MgColorSpaceKHR[MgColorSpaceKHR["SRGB_NONLINEAR_KHR"] = 0] = "SRGB_NONLINEAR_KHR";
    })(MgColorSpaceKHR = Magnesium.MgColorSpaceKHR || (Magnesium.MgColorSpaceKHR = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSwapchainCreateInfoKHR = (function () {
        function MgSwapchainCreateInfoKHR() {
        }
        return MgSwapchainCreateInfoKHR;
    }());
    Magnesium.MgSwapchainCreateInfoKHR = MgSwapchainCreateInfoKHR;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSemaphoreCreateInfo = (function () {
        function MgSemaphoreCreateInfo() {
        }
        return MgSemaphoreCreateInfo;
    }());
    Magnesium.MgSemaphoreCreateInfo = MgSemaphoreCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgFenceCreateFlagBits;
    (function (MgFenceCreateFlagBits) {
        MgFenceCreateFlagBits[MgFenceCreateFlagBits["SIGNALED_BIT"] = 1] = "SIGNALED_BIT";
    })(MgFenceCreateFlagBits = Magnesium.MgFenceCreateFlagBits || (Magnesium.MgFenceCreateFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgFenceCreateInfo = (function () {
        function MgFenceCreateInfo() {
        }
        return MgFenceCreateInfo;
    }());
    Magnesium.MgFenceCreateInfo = MgFenceCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCommandBufferLevel;
    (function (MgCommandBufferLevel) {
        MgCommandBufferLevel[MgCommandBufferLevel["PRIMARY"] = 0] = "PRIMARY";
        MgCommandBufferLevel[MgCommandBufferLevel["SECONDARY"] = 1] = "SECONDARY";
    })(MgCommandBufferLevel = Magnesium.MgCommandBufferLevel || (Magnesium.MgCommandBufferLevel = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCommandBufferAllocateInfo = (function () {
        function MgCommandBufferAllocateInfo() {
        }
        return MgCommandBufferAllocateInfo;
    }());
    Magnesium.MgCommandBufferAllocateInfo = MgCommandBufferAllocateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDeviceQueueCreateInfo = (function () {
        function MgDeviceQueueCreateInfo() {
        }
        return MgDeviceQueueCreateInfo;
    }());
    Magnesium.MgDeviceQueueCreateInfo = MgDeviceQueueCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPhysicalDeviceFeatures = (function () {
        function MgPhysicalDeviceFeatures() {
        }
        return MgPhysicalDeviceFeatures;
    }());
    Magnesium.MgPhysicalDeviceFeatures = MgPhysicalDeviceFeatures;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDeviceCreateInfo = (function () {
        function MgDeviceCreateInfo() {
        }
        return MgDeviceCreateInfo;
    }());
    Magnesium.MgDeviceCreateInfo = MgDeviceCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPhysicalDeviceType;
    (function (MgPhysicalDeviceType) {
        MgPhysicalDeviceType[MgPhysicalDeviceType["OTHER"] = 0] = "OTHER";
        MgPhysicalDeviceType[MgPhysicalDeviceType["INTEGRATED_GPU"] = 1] = "INTEGRATED_GPU";
        MgPhysicalDeviceType[MgPhysicalDeviceType["DISCRETE_GPU"] = 2] = "DISCRETE_GPU";
        MgPhysicalDeviceType[MgPhysicalDeviceType["VIRTUAL_GPU"] = 3] = "VIRTUAL_GPU";
        MgPhysicalDeviceType[MgPhysicalDeviceType["CPU"] = 4] = "CPU";
    })(MgPhysicalDeviceType = Magnesium.MgPhysicalDeviceType || (Magnesium.MgPhysicalDeviceType = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPhysicalDeviceLimits = (function () {
        function MgPhysicalDeviceLimits() {
        }
        return MgPhysicalDeviceLimits;
    }());
    Magnesium.MgPhysicalDeviceLimits = MgPhysicalDeviceLimits;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPhysicalDeviceSparseProperties = (function () {
        function MgPhysicalDeviceSparseProperties() {
        }
        return MgPhysicalDeviceSparseProperties;
    }());
    Magnesium.MgPhysicalDeviceSparseProperties = MgPhysicalDeviceSparseProperties;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPhysicalDeviceProperties = (function () {
        function MgPhysicalDeviceProperties() {
        }
        return MgPhysicalDeviceProperties;
    }());
    Magnesium.MgPhysicalDeviceProperties = MgPhysicalDeviceProperties;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgQueueFlagBits;
    (function (MgQueueFlagBits) {
        MgQueueFlagBits[MgQueueFlagBits["GRAPHICS_BIT"] = 1] = "GRAPHICS_BIT";
        MgQueueFlagBits[MgQueueFlagBits["COMPUTE_BIT"] = 2] = "COMPUTE_BIT";
        MgQueueFlagBits[MgQueueFlagBits["TRANSFER_BIT"] = 4] = "TRANSFER_BIT";
        MgQueueFlagBits[MgQueueFlagBits["SPARSE_BINDING_BIT"] = 8] = "SPARSE_BINDING_BIT";
    })(MgQueueFlagBits = Magnesium.MgQueueFlagBits || (Magnesium.MgQueueFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgQueueFamilyProperties = (function () {
        function MgQueueFamilyProperties() {
        }
        return MgQueueFamilyProperties;
    }());
    Magnesium.MgQueueFamilyProperties = MgQueueFamilyProperties;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgMemoryHeapFlagBits;
    (function (MgMemoryHeapFlagBits) {
        MgMemoryHeapFlagBits[MgMemoryHeapFlagBits["DEVICE_LOCAL_BIT"] = 1] = "DEVICE_LOCAL_BIT";
    })(MgMemoryHeapFlagBits = Magnesium.MgMemoryHeapFlagBits || (Magnesium.MgMemoryHeapFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgMemoryHeap = (function () {
        function MgMemoryHeap() {
        }
        return MgMemoryHeap;
    }());
    Magnesium.MgMemoryHeap = MgMemoryHeap;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgMemoryType = (function () {
        function MgMemoryType() {
        }
        return MgMemoryType;
    }());
    Magnesium.MgMemoryType = MgMemoryType;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgPhysicalDeviceMemoryProperties = (function () {
        function MgPhysicalDeviceMemoryProperties() {
        }
        return MgPhysicalDeviceMemoryProperties;
    }());
    Magnesium.MgPhysicalDeviceMemoryProperties = MgPhysicalDeviceMemoryProperties;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgFormatFeatureFlagBits;
    (function (MgFormatFeatureFlagBits) {
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["SAMPLED_IMAGE_BIT"] = 1] = "SAMPLED_IMAGE_BIT";
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["STORAGE_IMAGE_BIT"] = 2] = "STORAGE_IMAGE_BIT";
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["STORAGE_IMAGE_ATOMIC_BIT"] = 4] = "STORAGE_IMAGE_ATOMIC_BIT";
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["UNIFORM_TEXEL_BUFFER_BIT"] = 8] = "UNIFORM_TEXEL_BUFFER_BIT";
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["STORAGE_TEXEL_BUFFER_BIT"] = 16] = "STORAGE_TEXEL_BUFFER_BIT";
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["STORAGE_TEXEL_BUFFER_ATOMIC_BIT"] = 32] = "STORAGE_TEXEL_BUFFER_ATOMIC_BIT";
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["VERTEX_BUFFER_BIT"] = 64] = "VERTEX_BUFFER_BIT";
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["COLOR_ATTACHMENT_BIT"] = 128] = "COLOR_ATTACHMENT_BIT";
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["COLOR_ATTACHMENT_BLEND_BIT"] = 256] = "COLOR_ATTACHMENT_BLEND_BIT";
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["DEPTH_STENCIL_ATTACHMENT_BIT"] = 512] = "DEPTH_STENCIL_ATTACHMENT_BIT";
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["BLIT_SRC_BIT"] = 1024] = "BLIT_SRC_BIT";
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["BLIT_DST_BIT"] = 2048] = "BLIT_DST_BIT";
        MgFormatFeatureFlagBits[MgFormatFeatureFlagBits["SAMPLED_IMAGE_FILTER_LINEAR_BIT"] = 4096] = "SAMPLED_IMAGE_FILTER_LINEAR_BIT";
    })(MgFormatFeatureFlagBits = Magnesium.MgFormatFeatureFlagBits || (Magnesium.MgFormatFeatureFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgFormatProperties = (function () {
        function MgFormatProperties() {
        }
        return MgFormatProperties;
    }());
    Magnesium.MgFormatProperties = MgFormatProperties;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgImageFormatProperties = (function () {
        function MgImageFormatProperties() {
        }
        return MgImageFormatProperties;
    }());
    Magnesium.MgImageFormatProperties = MgImageFormatProperties;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgLayerProperties = (function () {
        function MgLayerProperties() {
        }
        return MgLayerProperties;
    }());
    Magnesium.MgLayerProperties = MgLayerProperties;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgExtensionProperties = (function () {
        function MgExtensionProperties() {
        }
        return MgExtensionProperties;
    }());
    Magnesium.MgExtensionProperties = MgExtensionProperties;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSparseImageFormatFlagBits;
    (function (MgSparseImageFormatFlagBits) {
        MgSparseImageFormatFlagBits[MgSparseImageFormatFlagBits["SINGLE_MIPTAIL_BIT"] = 1] = "SINGLE_MIPTAIL_BIT";
        MgSparseImageFormatFlagBits[MgSparseImageFormatFlagBits["ALIGNED_MIP_SIZE_BIT"] = 2] = "ALIGNED_MIP_SIZE_BIT";
        MgSparseImageFormatFlagBits[MgSparseImageFormatFlagBits["NONSTANDARD_BLOCK_SIZE_BIT"] = 4] = "NONSTANDARD_BLOCK_SIZE_BIT";
    })(MgSparseImageFormatFlagBits = Magnesium.MgSparseImageFormatFlagBits || (Magnesium.MgSparseImageFormatFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSparseImageFormatProperties = (function () {
        function MgSparseImageFormatProperties() {
        }
        return MgSparseImageFormatProperties;
    }());
    Magnesium.MgSparseImageFormatProperties = MgSparseImageFormatProperties;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSurfaceFormatKHR = (function () {
        function MgSurfaceFormatKHR() {
        }
        return MgSurfaceFormatKHR;
    }());
    Magnesium.MgSurfaceFormatKHR = MgSurfaceFormatKHR;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDisplayPlanePropertiesKHR = (function () {
        function MgDisplayPlanePropertiesKHR() {
        }
        return MgDisplayPlanePropertiesKHR;
    }());
    Magnesium.MgDisplayPlanePropertiesKHR = MgDisplayPlanePropertiesKHR;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDisplayModeParametersKHR = (function () {
        function MgDisplayModeParametersKHR() {
        }
        return MgDisplayModeParametersKHR;
    }());
    Magnesium.MgDisplayModeParametersKHR = MgDisplayModeParametersKHR;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDisplayModeCreateInfoKHR = (function () {
        function MgDisplayModeCreateInfoKHR() {
        }
        return MgDisplayModeCreateInfoKHR;
    }());
    Magnesium.MgDisplayModeCreateInfoKHR = MgDisplayModeCreateInfoKHR;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgSurfaceCapabilitiesKHR = (function () {
        function MgSurfaceCapabilitiesKHR() {
        }
        return MgSurfaceCapabilitiesKHR;
    }());
    Magnesium.MgSurfaceCapabilitiesKHR = MgSurfaceCapabilitiesKHR;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDisplayModePropertiesKHR = (function () {
        function MgDisplayModePropertiesKHR() {
        }
        return MgDisplayModePropertiesKHR;
    }());
    Magnesium.MgDisplayModePropertiesKHR = MgDisplayModePropertiesKHR;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDisplayPlaneAlphaFlagBitsKHR;
    (function (MgDisplayPlaneAlphaFlagBitsKHR) {
        MgDisplayPlaneAlphaFlagBitsKHR[MgDisplayPlaneAlphaFlagBitsKHR["OPAQUE_BIT_KHR"] = 1] = "OPAQUE_BIT_KHR";
        MgDisplayPlaneAlphaFlagBitsKHR[MgDisplayPlaneAlphaFlagBitsKHR["GLOBAL_BIT_KHR"] = 2] = "GLOBAL_BIT_KHR";
        MgDisplayPlaneAlphaFlagBitsKHR[MgDisplayPlaneAlphaFlagBitsKHR["PER_PIXEL_BIT_KHR"] = 4] = "PER_PIXEL_BIT_KHR";
        MgDisplayPlaneAlphaFlagBitsKHR[MgDisplayPlaneAlphaFlagBitsKHR["PER_PIXEL_PREMULTIPLIED_BIT_KHR"] = 8] = "PER_PIXEL_PREMULTIPLIED_BIT_KHR";
    })(MgDisplayPlaneAlphaFlagBitsKHR = Magnesium.MgDisplayPlaneAlphaFlagBitsKHR || (Magnesium.MgDisplayPlaneAlphaFlagBitsKHR = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDisplayPlaneCapabilitiesKHR = (function () {
        function MgDisplayPlaneCapabilitiesKHR() {
        }
        return MgDisplayPlaneCapabilitiesKHR;
    }());
    Magnesium.MgDisplayPlaneCapabilitiesKHR = MgDisplayPlaneCapabilitiesKHR;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgApplicationInfo = (function () {
        function MgApplicationInfo() {
        }
        MgApplicationInfo.prototype.generateApiVersion = function (major, minor, patch) {
            return ((major << 22) | (minor << 12) | (patch));
        };
        return MgApplicationInfo;
    }());
    Magnesium.MgApplicationInfo = MgApplicationInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgInstanceCreateInfo = (function () {
        function MgInstanceCreateInfo() {
        }
        return MgInstanceCreateInfo;
    }());
    Magnesium.MgInstanceCreateInfo = MgInstanceCreateInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgCommandPoolCreateFlagBits;
    (function (MgCommandPoolCreateFlagBits) {
        MgCommandPoolCreateFlagBits[MgCommandPoolCreateFlagBits["TRANSIENT_BIT"] = 1] = "TRANSIENT_BIT";
        MgCommandPoolCreateFlagBits[MgCommandPoolCreateFlagBits["RESET_COMMAND_BUFFER_BIT"] = 2] = "RESET_COMMAND_BUFFER_BIT";
    })(MgCommandPoolCreateFlagBits = Magnesium.MgCommandPoolCreateFlagBits || (Magnesium.MgCommandPoolCreateFlagBits = {}));
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDescriptorBufferInfo = (function () {
        function MgDescriptorBufferInfo() {
        }
        return MgDescriptorBufferInfo;
    }());
    Magnesium.MgDescriptorBufferInfo = MgDescriptorBufferInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDescriptorImageInfo = (function () {
        function MgDescriptorImageInfo() {
        }
        return MgDescriptorImageInfo;
    }());
    Magnesium.MgDescriptorImageInfo = MgDescriptorImageInfo;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgDisplayPropertiesKHR = (function () {
        function MgDisplayPropertiesKHR() {
        }
        return MgDisplayPropertiesKHR;
    }());
    Magnesium.MgDisplayPropertiesKHR = MgDisplayPropertiesKHR;
})(Magnesium || (Magnesium = {}));
var Magnesium;
(function (Magnesium) {
    var MgWriteDescriptorSet = (function () {
        function MgWriteDescriptorSet() {
        }
        return MgWriteDescriptorSet;
    }());
    Magnesium.MgWriteDescriptorSet = MgWriteDescriptorSet;
})(Magnesium || (Magnesium = {}));
//# sourceMappingURL=mg.js.map