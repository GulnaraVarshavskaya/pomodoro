import React from 'react'
import styled from 'styled-components'

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
}
`
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
  /* ${(props) => {
    return `display: ${props.selected ? "flex" : "none"}`
  }}; */
  /* content: ''; */
  /* position: absolute; */
  line-height: 40px;
  /* vertical-align: middle; */
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
              {/* <RadioInputCheck>
                {props.selected === true ? (<img src="./assets/icon-check.svg" />) : false}              
            </RadioInputCheck> */}
            
        </ColorRadioLabelContainer>
  )
}


