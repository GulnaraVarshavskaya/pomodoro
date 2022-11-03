import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../Button'
import RadioLabel from '../RadioLabel'
import FormInputLabel from '../molecules/FormInputLabel'
import Heading from '../Heading'
import ColorRadioLabel from '../ColorRadioLabel'



const fontFamily = {
    kumbhSans: "'Kumbh Sans', sans-serif;",
    robotoSlab: "'Roboto Slab', serif",
    spaceMono: "'Space Mono', monospace",
}



const colorFont = {
    dark: "rgba(30, 33, 63, 1)",
    light: "rgba(255, 255, 255, 1)",
}

const colorBg = {
    black: "rgba(22, 25, 50, 1)",
    white: "rgba(215, 224, 255, 1)",
    red: "rgba(248, 112, 112, 1)",
    blue: "rgba(112, 243, 248, 1)",
    violet: "rgba(216, 129, 248, 1)"
}


const SettingsModalContainer = styled.div`
    display: flex;
    position: relative;
    width: 540px;
    height: 464px;
    flex-direction: column;
    margin-top: 155px;
    border-radius: 25px;
    background-color: white;
    z-index: 5;
`

const SettingsModalHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(227, 225, 225, 1);
    padding: 32px 40px;
`

const CloseButton = styled.button`
    background: none;
    cursor: pointer;
    border: none;
    &:focus {
    outline: 0;
    } 
`

const SettingsModalBody = styled.div`
    padding: 0 40px 50px;
`

const SettingsModalSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 24px;
    padding-top: 24px;
    &:not(&:last-of-type) {
       border-bottom: 1px solid rgba(227, 225, 225, 1); 
    }   
`

const ModalInputLabelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`

const RadioGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: right;
    align-items: center;
`

const FontRadioLabel = styled(RadioLabel)`
    span {
        font-size: 15px;
        font-weight: 400px;
        /* font-family: ${(props) => fontFamily[props.font]}; */
        background-color: ${(props) => colorBg[props.backgroundColor]};
        color: ${(props) => colorFont[props.color]};        
    }
`


const HeadingInputWrapper = styled.div`
    display: block;
`



function SettingsModal(props) {

const {showModal, closeModal} = props

// console.log("props inside SettingsModal", props)
  return (
    <>
    {showModal ? (<SettingsModalContainer showModal={showModal}>
        <SettingsModalHeader>
            <Heading
            size="headingL"
            color="dark"
            >
                Settings
            </Heading>
            <CloseButton onClick={closeModal}>
                <img src="./assets/icon-close.svg" alt="Close modal" />
            </CloseButton>
        </SettingsModalHeader>
        <SettingsModalBody>
            <SettingsModalSection>
                <HeadingInputWrapper>
                    <Heading
                    size="headingS"
                    letter="letterSpaceSmall"
                    color="dark"
                    >
                        TIME (MINUTES)
                    </Heading>
                    <ModalInputLabelWrapper>
                        <FormInputLabel
                        number={props.numberPomodoro}
                        handleClickUp={props.handleClickUpPomodoro}
                        handleClickDown={props.handleClickDownPomodoro}
                        handleNumber={props.handleNumberPomodoro}
                        label="pomodoro"
                        />
                        <FormInputLabel
                        number={props.numberShortBreak}
                        handleClickUp={props.handleClickUpShortBreak}
                        handleClickDown={props.handleClickDownShortBreak}
                        handleNumber={props.handleNumberShortBreak}
                        label="short break"
                        />
                        <FormInputLabel
                        number={props.numberLongBreak}
                        handleClickUp={props.handleClickUpLongBreak}
                        handleClickDown={props.handleClickDownLongBreak}
                        handleNumber={props.handleNumberLongBreak}
                        label="long break"
                        />
                    </ModalInputLabelWrapper>
                </HeadingInputWrapper>
            </SettingsModalSection>
            <SettingsModalSection>
                <Heading
                size="headingS"
                letter="letterSpaceSmall"
                color="dark"
                >
                    FONT
                </Heading>
                <RadioGroup>
                    {props.fontOptions.map((font) => {
                        return <FontRadioLabel
                        key={font}
                        font={font}
                        span="Aa"
                        selected={font === props.selectedFont}
                        onClick={() => props.onFontSelection(font)}
                        >
                        </FontRadioLabel> 
                    })}
                </RadioGroup>
            </SettingsModalSection>
            <SettingsModalSection>
                <Heading
                size="headingS"
                letter="letterSpaceSmall"
                color="dark"
                >
                    COLOR
                </Heading>
                <RadioGroup>
                    {props.colorOptions.map((color) => {
                        return <ColorRadioLabel
                        key={color}
                        backgroundColor={color}
                        selected={color === props.selectedColor}
                        onClick={(e) => props.onColorSelection(color)}
                        >                           
                        </ColorRadioLabel>
                    })}
                        
                </RadioGroup>
            </SettingsModalSection>
            <Button
            backgroundColor="red"
            >Apply</Button>
        </SettingsModalBody>
    </SettingsModalContainer>) : null}
    </>
  )
}

export default SettingsModal