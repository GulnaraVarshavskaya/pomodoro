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

const paddingsMobile = {
  padding: "18px 23px"
}

const paddingsDesktop = {
  padding: "17px 26px"
}

const sizeMobile = {
  size: "12px"
}

const sizeDesktop = {
  size: "14px"
}

const heightMobile = {
  height: "12px"
}

const heightDesktop = {
  height: "14px"
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
  /* border-radius: 26.5px; */
  cursor: pointer;
`

const RadioInputText = styled.span`
  padding: ${(props) => paddingsMobile[props.padding]};
  border-radius: 26.5px;
  font-family: ${(props) => fonts[props.selectedFont]};
  color: rgba(215, 224, 255, 0.4);
  font-size: ${(props) => sizeMobile[props.size]};
  line-height: ${(props) => heightMobile[props.height]};
  font-weight: bold;
  transition: left 0.25s ease-out;
  &:hover {
    color: rgba(215, 224, 255);
  }
  @media only screen and (min-width: 768px){
        padding: ${(props) => paddingsDesktop[props.padding]};
        font-size: ${(props) => sizeDesktop[props.size]};
        line-height: ${(props) => heightDesktop[props.height]};
    };
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
            padding="padding"
            size="size"
            height="height"
            selectedFont={props.selectedFont}
            font="kumbhSans"
            >{props.span}</RadioInputText>
        </ToggleLabelContainer>
  )
}
