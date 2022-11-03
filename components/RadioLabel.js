import React from 'react'
import styled from 'styled-components'

const fontFamily = {
  kumbhSans: "'Kumbh Sans', sans-serif;",
  robotoSlab: "'Roboto Slab', serif",
  spaceMono: "'Space Mono', monospace",
}

const colorFont = {
  dark: "rgba(22, 25, 50, 1)",
  light: "rgba(215, 224, 255, 1)",
}

const colorBg = {
    red: "rgba(248, 112, 112, 1)",
    blue: "rgba(112, 243, 248, 1)",
    violet: "rgba(216, 129, 248, 1)"
}

const RadioInput = styled.input.attrs({type: "radio"})`
  -webkit-appearance: none; 
  -moz-appearance: none;
  position: absolute;
  &:focus {
    outline: none;
  }
  &:checked ~ span:first-of-type {
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 50%;
  color: rgba(255, 255, 255, 1);
  font-weight: bold;
  font-family: ${(props) => fontFamily[props.font]};
  background-color: rgba(22, 25, 50, 1);
}
`
const RadioLabelContainer = styled.label`
  display: flex;
  width: 40px;
  height: 40px;
  background-color: rgba(239, 241, 250, 1);
  border-radius: 50%;
  cursor: pointer;
`

const RadioInputText = styled.span`
  padding: 0px 10px;
  font-family: ${(props) => fontFamily[props.font]};
  color: rgba(30, 33, 63, 1);
  font-size: 15px;
  line-height: 40px;
  font-weight: normal;
  transition: left 0.25s ease-out;
`

export default function RadioLabel(props) {
  return (
        <RadioLabelContainer>
            <RadioInput
            name="mode"
            />
            <RadioInputText
            font={props.font}
            >{props.span}</RadioInputText>
        </RadioLabelContainer>
  )
}


