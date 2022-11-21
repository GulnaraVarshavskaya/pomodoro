import RadioInput from '../atoms/RadioInput'
import React from 'react'
import styled from 'styled-components'

const colorBg = {
    red: "rgba(248, 112, 112, 1)",
    blue: "rgba(112, 243, 248, 1)",
    violet: "rgba(216, 129, 248, 1)"
}

const ColorRadioLabelContainer = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: ${(props) => colorBg[props.backgroundColor]};
  border-radius: 50%;
  cursor: pointer;
`

const RadioInputCheck = styled.span`
  line-height: 40px;
`


export default function ColorRadioLabel(props) {

  return (
        <ColorRadioLabelContainer
        backgroundColor={props.backgroundColor}
        onClick={props.onClick}
        >
            <RadioInput
            name="mode"
            />
            {props.selected === true ? (<RadioInputCheck>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5.5L4.95263 9.45263L13.4053 1" stroke="#161932" stroke-width="2"/>
              </svg>
            </RadioInputCheck>) : false}
            
        </ColorRadioLabelContainer>
  )
}


