import React from 'react'
import styled from 'styled-components'
import RadioInput from '../atoms/RadioInput'

const fontFamily = {
  kumbhSans: "'Kumbh Sans', sans-serif;",
  robotoSlab: "'Roboto Slab', serif",
  spaceMono: "'Space Mono', monospace",
}

const RadioLabelContainer = styled.label`
  display: flex;
  width: 40px;
  height: 40px;
  background-color: rgba(239, 241, 250, 1);
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 0px 4px white, 0px 0px 0px 5px #EFF1FA;
  }
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
            onClick={props.onClick}
            name="mode"
            checked={props.selected}
            font={props.font}
            color="light"
            backgroundColor="black"
            />
            <RadioInputText 
            font={props.font}          
            >{props.span}</RadioInputText>
        </RadioLabelContainer>
  )
}


