import styled from "styled-components"


const InputCounter = styled.input.attrs({ type: 'number' })`
    padding: 15px 16px;
    border: none;    
    border-radius: 10px; 
    background-color: rgba(239, 241, 250, 1);
    color: rgba(30, 33, 63, 1);
    font-family: 'Kumbh Sans';
    font-size: 14px;
    font-weight: bold;
    line-height: 14px;
    width: 140px;
    cursor: pointer;
    &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    }    
    &:focus {
    outline: 0;
    } 
    @media only screen and (min-width: 768px){
        padding: 17px 16px;
    };
`

export default InputCounter;