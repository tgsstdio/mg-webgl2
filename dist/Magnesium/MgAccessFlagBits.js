"use strict";
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
//# sourceMappingURL=MgAccessFlagBits.js.map