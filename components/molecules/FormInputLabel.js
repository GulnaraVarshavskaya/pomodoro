import Label from '../Label'
import InputCounter from '../InputCounter'
import styled from 'styled-components'
import React from 'react'

const FormContainer = styled.div`
    width: 140px;
    margin-top: 24px;
`

const NumberWrapper = styled.div`
    position: relative;
`


const UpArrow = styled.img`
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
`

const DownArrow = styled.img`
    position: absolute;
    right: 16px;
    bottom: 16px;
    cursor: pointer;
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