"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    padding: 17px 16px;\n    border: none;    \n    border-radius: 10px; \n    background-color: rgba(239, 241, 250, 1);\n    color: rgba(30, 33, 63, 1);\n    font-family: 'Kumbh Sans';\n    font-size: 14px;\n    font-weight: bold;\n    line-height: 14px;\n    width: 140px;\n    cursor: pointer;\n    &::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    }    \n    &:focus {\n    outline: 0;\n    } \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var InputCounter = _styledComponents["default"].input.attrs({
  type: 'number'
})(_templateObject());

var _default = InputCounter;
exports["default"] = _default;