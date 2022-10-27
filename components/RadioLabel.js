// import styled from "styled-components";

// const colorFont = {
//     dark: "rgba(30, 33, 63, 1)",
//     light: "rgba(255, 255, 255, 1)",
// }

// const colorBg = {
//     black: "rgba(22, 25, 50, 1)",
//     white: "rgba(215, 224, 255, 1)",
//     red: "rgba(248, 112, 112, 1)",
//     blue: "rgba(112, 243, 248, 1)",
//     violet: "rgba(216, 129, 248, 1)"
// }

// const RadioLabel = styled.input`
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

import React from 'react'
import styled from 'styled-components'


const RadioInput = styled.input.attrs({type: "radio"})`
  -webkit-appearance: none; 
  -moz-appearance: none;
  position: absolute;
  &:focus {
    outline: none;
  }
  &:checked ~ span:first-of-type {
  transition: 0.15s ease-out;
  color: rgba(30, 33, 63, 1);
  background-color: rgba(248, 112, 112, 1);
}
`
const RadioLabelContainer = styled.label`
  display: flex;
  width: 40px;
  height: 40px;
  background-color: rgba(22, 25, 50, 1);
  border-radius: 50%;
  cursor: pointer;
`

const fontFamily = {
  kumbhSans: "'Kumbh Sans', sans-serif;",
  robotoSlab: "'Roboto Slab', serif",
  spaceMono: "'Space Mono', monospace",
}

const colorBg = {
    red: "rgba(248, 112, 112, 1)",
    blue: "rgba(112, 243, 248, 1)",
    violet: "rgba(216, 129, 248, 1)"
}

const RadioInputText = styled.span`
  padding: 17px 26px;
  border-radius: 26.5px;
  font-family: ${(props) => fontFamily[props.font]};
  color: rgba(215, 224, 255, 0.4);
  font-size: 14px;
  line-height: 14px;
  font-weight: bold;
  transition: left 0.25s ease-out;
`

export default function RadioLabel(props) {
  return (
        <RadioLabelContainer>
            <RadioInput
            name="mode"
            />
            <RadioInputText
            font="kumbhSans"
            >{props.span}</RadioInputText>
        </RadioLabelContainer>
  )
}


