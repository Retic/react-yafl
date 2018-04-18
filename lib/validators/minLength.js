"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function minLength(length, message) {
    var test = function (value, formValue, fieldName) {
        var val = value.value || '';
        if (typeof val === 'string') {
            if (value.touched && val.length < length) {
                return message || fieldName + " should be at least " + length + " characters";
            }
        }
        return undefined;
    };
    return test;
}
exports.default = minLength;
//# sourceMappingURL=minLength.js.map