import styled from "styled-components";
import FormInputLabel from "./molecules/FormInputLabel";
import ButtonCircle from "./RadioLabel";
import Button from "./Button";

const Form = styled.form`
  display: flex;
  /* width: 140px; */
  /* position: absolute; */
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 19px;
  }
`

export default Form;