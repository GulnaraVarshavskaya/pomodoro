import Button from '../atoms/Button'
import FontRadioLabel from '../molecules/FontRadioLabel'
import FormInputLabel from '../molecules/FormInputLabel'
import Heading from '../atoms/Heading'
import ColorRadioLabel from '../molecules/ColorRadioLabel'

import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { settingsContext } from '../../pages'


const ModalContainer = styled.div`
    display: flex;
    align-items: center;
`


const SettingsModalContainer = styled.div`
    position: fixed;
    inset: calc((100vh - 580px)/2) calc((100vw - 328px)/2);
    border-radius: 25px;
    background-color: white;
    z-index: 100;
    @media only screen and (min-width: 768px){
        inset: calc((100vh - 464px)/2) calc((100vw - 540px)/2);
    };
`

const SettingsModalHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(227, 225, 225, 1);
    padding: 24px 24px 28px;
    @media only screen and (min-width: 768px){
        padding: 33px 40px;
    };
`

const CloseButton = styled.button`
    background: none;
    cursor: pointer;
    border: none;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
    &:focus {
        outline: 0;
    } 
`

const SettingsModalBody = styled.div`
    padding: 0 24px 50px;
    @media only screen and (min-width: 768px){
        padding: 0 40px 50px;
    };
`

const SettingsModalSection = styled.div`
    text-align: center;
    padding-bottom: 22px;
    padding-top: 22px;
    &:not(&:last-of-type) {
       border-bottom: 1px solid rgba(227, 225, 225, 1); 
       padding-bottom: 24px;
        padding-top: 24px;
    }   
    @media only screen and (min-width: 768px){
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: left;
        padding-bottom: 19px;
        padding-top: 19px;
    };
`

const ModalInputLabelWrapper = styled.div`

    margin-top: 10px;

    @media only screen and (min-width: 768px){
        display: flex;
        flex-direction: row;
        gap: 20px;
        margin-top: 14px;
    };
`

const RadioGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    justify-content: center;
    margin-top: 18px;
    @media only screen and (min-width: 768px){
        width: 100%;
        justify-content: right;
        margin-top: 0;
    };
`

const HeadingInputWrapper = styled.div`
    display: block;
`


function SettingsModal() {

const { colorOptions, fontOptions, selectedColor, selectedFont, timeInputs, handleChanges, showSettingsModal, closeSettingsModal } = useContext(settingsContext)

const [temporaryColor, setTemporaryColor] = useState(selectedColor);
const [temporaryFont, setTemporaryFont] = useState(selectedFont);
const [temporaryTimeInputs, setTemporaryTimeInputs] = useState(timeInputs)

const updateTimeInputs = (e) => {
    const max = 60
    const limitedVal = Math.min( e.target.value, max )
    setTemporaryTimeInputs({ ...temporaryTimeInputs, [e.target.name]: limitedVal})
}

const updateTimeInputsUp = (e) => {
    if (temporaryTimeInputs[e.target.name] < 60) {
    setTemporaryTimeInputs({ ...temporaryTimeInputs, [e.target.name]: temporaryTimeInputs[e.target.name] + 1 })}
}

const updateTimeInputsDown = (e) => {
    if (temporaryTimeInputs[e.target.name] > 0) {
    setTemporaryTimeInputs({ ...temporaryTimeInputs, [e.target.name]: temporaryTimeInputs[e.target.name] - 1 })}
}

const submit = (e) => {
    e.preventDefault();
    handleChanges(temporaryColor, temporaryFont, temporaryTimeInputs)    
}


  return (
    <ModalContainer showSettingsModal={showSettingsModal}>
    <SettingsModalContainer>
        <SettingsModalHeader>
            <Heading
            size="headingM"
            color="dark"
            >
                Settings
            </Heading>
            <CloseButton onClick={closeSettingsModal}>
                <img src="./assets/icon-close.svg" alt="Close modal" />
            </CloseButton>
        </SettingsModalHeader>
        <SettingsModalBody
        >
            <form onSubmit={submit}>
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
                            name="pomodoro"
                            number={temporaryTimeInputs.pomodoro}
                            onChange={updateTimeInputs}
                            handleClickUp={updateTimeInputsUp}
                            handleClickDown={updateTimeInputsDown}
                            label="pomodoro"
                            />
                            <FormInputLabel
                            name="shortBreak"
                            number={temporaryTimeInputs.shortBreak}
                            onChange={updateTimeInputs}
                            handleClickUp={updateTimeInputsUp}
                            handleClickDown={updateTimeInputsDown}
                            label="short break"
                            />
                            <FormInputLabel
                            name="longBreak"
                            number={temporaryTimeInputs.longBreak}
                            onChange={updateTimeInputs}
                            handleClickUp={updateTimeInputsUp}
                            handleClickDown={updateTimeInputsDown}
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
                        {fontOptions.map((font) => {
                            return <FontRadioLabel
                            key={font}
                            font={font}
                            span="Aa"
                            selected={font === temporaryFont}
                            onClick={() => setTemporaryFont(font)}
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
                        {colorOptions.map((color) => {
                            return <ColorRadioLabel
                            key={color}
                            backgroundColor={color}
                            selected={color === temporaryColor}
                            onClick={() => setTemporaryColor(color)}
                            >                           
                            </ColorRadioLabel>
                        })}
                            
                    </RadioGroup>
                </SettingsModalSection>
                <Button
                backgroundColor="red"
                onClick={submit}
                >Apply</Button>
            </form>
        </SettingsModalBody>
    </SettingsModalContainer>
    </ModalContainer>
  )
}

export default SettingsModal