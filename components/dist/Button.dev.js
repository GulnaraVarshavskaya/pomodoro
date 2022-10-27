"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    position: absolute;\n    bottom: 0;\n    left: 50%;\n    transform: translate(-50%, 50%);\n    padding: 19px 47px;\n    border-radius: 27px;\n    background-color: ", ";\n    &:hover {\n        /* background-color: rgba(248, 112, 112, 0.8); */\n        background-color: rgba(250, 141, 141, 1);\n    }\n    font-size: 16px;\n    font-family: 'Kumbh Sans';\n    font-weight: bold;\n    line-height: 16px;\n    color: white;\n    border: none;\n    cursor: pointer;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var colorBg = {
  red: "rgba(248, 112, 112, 1)",
  blue: "rgba(112, 243, 248, 1)",
  violet: "rgba(216, 129, 248, 1)"
};

var Button = _styledComponents["default"].button(_templateObject(), function (props) {
  return colorBg[props.backgroundColor];
});

var _default = Button;
exports["default"] = _default;