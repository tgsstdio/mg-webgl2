"use strict";
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
//# sourceMappingURL=MgApplicationInfo.js.map