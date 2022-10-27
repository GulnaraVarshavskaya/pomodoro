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
const ToggleLabelContainer = styled.label`
  display: flex;
  background-color: rgba(22, 25, 50, 1);
  border-radius: 26.5px;
  cursor: pointer;
`

const fontFamily = {
  kumbhSans: "'Kumbh Sans', sans-serif;",
  robotoSlab: "'Roboto Slab', serif",
  spaceMono: "'Space Mono', monospace",
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

export default function ToggleLabel(props) {
  return (
        <ToggleLabelContainer>
            <RadioInput
            name="mode"
            />
            <RadioInputText
            font="kumbhSans"
            >{props.span}</RadioInputText>
        </ToggleLabelContainer>
  )
}
