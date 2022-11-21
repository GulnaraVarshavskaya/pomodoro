import styled from "styled-components";

const Form = styled.form`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 19px;
  }
`

export default Form;