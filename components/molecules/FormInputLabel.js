import Label from '../Label'
import InputCounter from '../InputCounter'
import styled from 'styled-components'
import React, {useState} from 'react'

const FormContainer = styled.div`
    width: 140px;
    /* display: flex; */
    /* position: absolute; */
    /* flex-direction: column; */
    justify-content: center;
    /* align-items: left; */
    margin-top: 22px;
`

const NumberWrapper = styled.div`
    position: relative;
`


const UpArrow = styled.img`
    position: absolute;
    right: 16px;
    top: 16px;
    /* pointer-events: none; */
`

const DownArrow = styled.img`
    position: absolute;
    right: 16px;
    bottom: 16px;
    /* pointer-events: none; */
`

export default function FormInputLabel (props) {
    const [number, setNumber] = useState(0)
    const handleClickUp = () => {    
        setNumber(number + 1)
        console.log("number", number)
    }
    const handleClickDown = () => { 
        if(number > 0) {   
        setNumber(number - 1)
        }
    }


 return <FormContainer>
                <Label>
                {props.label}
                </Label>
            <NumberWrapper>
                <UpArrow 
                src="assets/icon-arrow-up.svg"
                onClick={handleClickUp}
                />
                <DownArrow
                src="assets/icon-arrow-down.svg"
                onClick={handleClickDown}   
                />
                
                <InputCounter
                placeholder="1"
                value={number}
                />
                </NumberWrapper> 
        </FormContainer>
}