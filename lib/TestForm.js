"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var _1 = require(".");
var _a = _1.createForm(), Form = _a.Form, Field = _a.Field, createTypedField = _a.createTypedField;
var Surname = createTypedField('surname');
var Age = createTypedField('age');
var TTT = function (props) { return (React.createElement(Form, { initialValue: { name: 'stuart' } },
    React.createElement(Field, { name: "name", render: function (field) {
            // const f = field.value
            return (React.createElement("input", { name: field.name, 
                // onChange={field.onChange}
                onChange: function (e) { return field.setFieldValue('name', ''); }, value: "", onBlur: field.onBlur, placeholder: "First Name" }));
        } }),
    React.createElement(Surname, { name: "surname", render: function (field) {
            var value = field.value;
            return (React.createElement("input", { name: field.name, value: value, 
                //onChange={e => field.setFieldValue('surname', 'bourhill')}
                onChange: field.onChange, onBlur: field.onBlur, placeholder: "First Name" }));
        } }),
    React.createElement(Age, { name: "age", render: function (field) {
            var value = field.value;
            field.setValue(33);
            return (React.createElement("input", { name: field.name, onChange: function (e) { return field.setFieldValue('age', 33); }, onBlur: field.onBlur, placeholder: "First Name", value: value }));
        } }))); };
exports.default = TTT;
//# sourceMappingURL=TestForm.js.map