"use strict";
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
//# sourceMappingURL=MgClearColorValue.js.map