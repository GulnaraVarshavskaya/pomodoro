import styled from 'styled-components'

const colorFont = {
    dark: "rgba(22, 25, 50, 1)",
    light: "rgba(215, 224, 255, 1)",
  }

const colorBg = {
    black: "rgba(22, 25, 50, 1)",
    white: "rgba(215, 224, 255, 1)",
    red: "rgba(248, 112, 112, 1)",
    blue: "rgba(112, 243, 248, 1)",
    violet: "rgba(216, 129, 248, 1)"
}

const fontFamily = {
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
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 50%;
  color: ${(props) => colorFont[props.color]}; 
  background-color: ${(props) => colorBg[props.backgroundColor]};
  font-weight: bold;
  font-family: ${(props) => fontFamily[props.font]};
}
`

export default RadioInput;
  