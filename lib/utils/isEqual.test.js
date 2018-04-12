"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual_1 = require("./isEqual");
var obj1 = { a: 'foo', b: 'bar' };
var obj2 = { a: 'foo', b: 'bar' };
var arr1 = ['foo', 'bar'];
var arr2 = ['foo', 'bar'];
var deep1 = {
    a: {
        b: {
            c: [
                {
                    x: 'foo',
                    y: 'bar'
                }
            ]
        }
    }
};
var deep2 = {
    a: {
        b: {
            c: [
                {
                    x: 'foo1',
                    y: 'bar2'
                }
            ]
        }
    }
};
describe('should correctly compare 2 values for equality', function () {
    test('primitive values', function () {
        expect(isEqual_1.default(true, true)).toBe(true);
        expect(isEqual_1.default(true, false)).toBe(false);
        expect(isEqual_1.default('abcdefghijklmnop', 'abcdefghijklmnop')).toBe(true);
        expect(isEqual_1.default('xyz', 'xzy')).toBe(false);
        expect(isEqual_1.default(null, null)).toBe(true);
        expect(isEqual_1.default(undefined, null)).toBe(false);
    });
    test('reference values', function () {
        expect(isEqual_1.default({}, {})).toBe(true);
        expect(isEqual_1.default([], [])).toBe(true);
        expect(isEqual_1.default(obj1, obj1)).toBe(true);
        expect(isEqual_1.default(obj1, obj2)).toBe(true);
        expect(isEqual_1.default(arr1, arr1)).toBe(true);
        expect(isEqual_1.default(arr1, arr2)).toBe(true);
        expect(isEqual_1.default({}, [])).toBe(false);
        expect(isEqual_1.default(obj1, arr1)).toBe(false);
        expect(isEqual_1.default(deep1, deep1)).toBe(true);
        expect(isEqual_1.default(deep1, deep2)).toBe(false);
    });
});
//# sourceMappingURL=isEqual.test.js.map