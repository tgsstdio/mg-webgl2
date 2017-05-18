"use strict";
var Magnesium;
(function (Magnesium) {
    var MgColor4f = (function () {
        function MgColor4f(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        MgColor4f.prototype.equals = function (other) {
            var EPSILON = 2.2204460492503130808472633361816E-16;
            return Math.abs(this.r - other.r) <= EPSILON
                && Math.abs(this.g - other.g) <= EPSILON
                && Math.abs(this.b - other.b) <= EPSILON
                && Math.abs(this.a - other.a) <= EPSILON;
        };
        return MgColor4f;
    }());
    Magnesium.MgColor4f = MgColor4f;
})(Magnesium || (Magnesium = {}));
//# sourceMappingURL=MgColor4f.js.map