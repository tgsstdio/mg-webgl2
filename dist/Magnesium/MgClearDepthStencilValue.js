"use strict";
var Magnesium;
(function (Magnesium) {
    var MgClearDepthStencilValue = (function () {
        function MgClearDepthStencilValue() {
        }
        MgClearDepthStencilValue.prototype.equals = function (other) {
            var EPSILON = 2.2204460492503130808472633361816E-16;
            if (Math.abs(this.depth - other.depth) > EPSILON)
                return false;
            return (Math.abs(this.stencil - other.stencil) <= EPSILON);
        };
        return MgClearDepthStencilValue;
    }());
    Magnesium.MgClearDepthStencilValue = MgClearDepthStencilValue;
})(Magnesium || (Magnesium = {}));
//# sourceMappingURL=MgClearDepthStencilValue.js.map