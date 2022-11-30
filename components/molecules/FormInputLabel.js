import Label from '../atoms/Label'
import InputCounter from '../atoms/InputCounter'
import styled from 'styled-components'
import React from 'react'

const FormContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 8px;
    justify-content: space-between;
    @media only screen and (min-width: 768px){
        display: block;
        width: 140px;
    };
`

const NumberWrapper = styled.div`
    position: relative;
`


const UpArrow = styled.img`
    position: absolute;
    right: 16px;
    top: 14px;
    cursor: pointer;
    opacity: 0.25;
    &:hover {
        opacity: 1;
    }
`

const DownArrow = styled.img`
    position: absolute;
    right: 16px;
    bottom: 14px;
    cursor: pointer;
    opacity: 0.25;
    &:hover {
        opacity: 1;
    }
`

export default function FormInputLabel (props) {


 return <FormContainer>
                <Label>
                {props.label}
                </Label>
            <NumberWrapper>
                
                <UpArrow 
                src="assets/icon-arrow-up.svg"
                name={props.name}
                onClick={props.handleClickUp}
                />
                <DownArrow
                src="assets/icon-arrow-down.svg"
                name={props.name}
                onClick={props.handleClickDown}   
                />
                
                <InputCounter
                placeholder="0"
                type="number"
                name={props.name}
                value={Number(props.number).toString()}
                onChange={props.onChange}
                />
                </NumberWrapper> 
        </FormContainer>
}