"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _FormInputLabel = _interopRequireDefault(require("./molecules/FormInputLabel"));

var _RadioLabel = _interopRequireDefault(require("./RadioLabel"));

var _Button = _interopRequireDefault(require("./Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  /* width: 140px; */\n  /* position: absolute; */\n  /* flex-direction: column; */\n  justify-content: space-between;\n  align-items: center;\n  &:not(:last-of-type) {\n    margin-bottom: 19px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Form = _styledComponents["default"].form(_templateObject());

var _default = Form;
exports["default"] = _default;