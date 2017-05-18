"use strict";
var Magnesium;
(function (Magnesium) {
    var MgVec4i = (function () {
        function MgVec4i(x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        MgVec4i.prototype.equals = function (other) {
            var EPSILON = 2.2204460492503130808472633361816E-16;
            return Math.abs(this.x - other.x) <= EPSILON
                && Math.abs(this.y - other.y) <= EPSILON
                && Math.abs(this.z - other.z) <= EPSILON
                && Math.abs(this.w - other.w) <= EPSILON;
        };
        return MgVec4i;
    }());
    Magnesium.MgVec4i = MgVec4i;
})(Magnesium || (Magnesium = {}));
//# sourceMappingURL=MgVec4i.js.map