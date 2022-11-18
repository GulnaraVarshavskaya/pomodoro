import React, { useContext } from 'react'
import styled from 'styled-components'
import { settingsContext } from '../../pages'

const colors = {
  red: "rgba(248, 112, 112, 1)",
  blue: "rgba(112, 243, 248, 1)",
  violet: "rgba(216, 129, 248, 1)"
}

const fonts = {
  kumbhSans: "'Kumbh Sans', sans-serif;",
  robotoSlab: "'Roboto Slab', serif",
  spaceMono: "'Space Mono', monospace",
}


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
  background-color: ${(props) => colors[props.selectedColor]};
}
`
const ToggleLabelContainer = styled.label`
  display: flex;
  /* background-color: ${(props) => colors[props.selectedColor]}; */
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
  font-family: ${(props) => fonts[props.selectedFont]};
  color: rgba(215, 224, 255, 0.4);
  font-size: 14px;
  line-height: 14px;
  font-weight: bold;
  transition: left 0.25s ease-out;
`

export default function ToggleLabel(props) {
  
  const { mode, setMode} = useContext(settingsContext)

  return (
        <ToggleLabelContainer>
            <RadioInput
            name="mode"
            value={props.value}
            selectedColor={props.selectedColor}
            selectedFont={props.selectedFont}
            onChange={ (e) => {
              setMode(e.target.value)
            } }
            checked={mode === props.value}
            />
            <RadioInputText
            selectedFont={props.selectedFont}
            font="kumbhSans"
            >{props.span}</RadioInputText>
        </ToggleLabelContainer>
  )
}
