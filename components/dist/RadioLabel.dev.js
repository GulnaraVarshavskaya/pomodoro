"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RadioLabel;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var colorFont = {
  dark: "rgba(30, 33, 63, 1)",
  light: "rgba(255, 255, 255, 1)"
};
var colorBg = {
  black: "rgba(22, 25, 50, 1)",
  white: "rgba(215, 224, 255, 1)",
  red: "rgba(248, 112, 112, 1)",
  blue: "rgba(112, 243, 248, 1)",
  violet: "rgba(216, 129, 248, 1)"
}; // const RadioLabel = styled.input`
//     ::placeholder {
//         color: ${(props) => colorFont[props.color]};
//     }
//     width: 40px;
//     height: 40px;
//     padding: 12px 10px;
//     border-radius: 50px;
//     background-color: ${(props) => colorBg[props.backgroundColor]};
//     /* &:hover {
//         background-color: rgba(248, 112, 112, 0.8);
//     } */
//     font-size: 15px;
//     font-family: 'Kumbh Sans';
//     font-weight: bold;
//     line-height: 15px;    
//     border: none;
//     &:focus {
//     outline: 0;
//     } 
// `
// const RadioLabel = styled.label`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//         span {
//             display: flex;
//             position: relative;
//             margin: 0 16px;
//             width: 20px;
//             height: 20px;
//             justify-content: center;
//             align-items: center;
//             border-radius: 50%;
//             cursor: pointer;
//             &::before {
//                 content: '';
//                 display: none;
//                 position: absolute;
//                 top: -10px;
//                 left: -10px;
//                 width: 50px;
//                 height: 50px;
//                 border-radius: 50%;
//                 border: 1px solid #ffffff;
//             }
//             &:hover::before {
//                 display: block;
//             }
//         }
//         input {
//             opacity: 0;
//             width: 0px;
//             height: 0px;
//             &:focus + span::before {
//                 display: block;
//             }
//         }
// `

function RadioLabel(props) {
  return;
}