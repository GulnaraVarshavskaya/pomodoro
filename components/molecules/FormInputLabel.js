import Label from '../Label'
import InputCounter from '../InputCounter'
import styled from 'styled-components'
import React, {useState} from 'react'

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
    /* pointer-events: none; */
`

const DownArrow = styled.img`
    position: absolute;
    right: 16px;
    bottom: 16px;
    /* pointer-events: none; */
`

export default function FormInputLabel (props) {


 return <FormContainer>
                <Label>
                {props.label}
                </Label>
            <NumberWrapper>
                <UpArrow 
                src="assets/icon-arrow-up.svg"
                onClick={props.handleClickUp}
                />
                <DownArrow
                src="assets/icon-arrow-down.svg"
                onClick={props.handleClickDown}   
                />
                
                <InputCounter
                placeholder="0"
                type="number"
                value={Number(props.number).toString()}
                onChange={props.handleNumber}
                />
                </NumberWrapper> 
        </FormContainer>
}