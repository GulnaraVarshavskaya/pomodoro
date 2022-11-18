import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button'
import RadioLabel from '../RadioLabel'
import FormInputLabel from '../molecules/FormInputLabel'
import Heading from '../Heading'
import ColorRadioLabel from '../ColorRadioLabel'
import { settingsContext } from '../../pages'



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

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`


const SettingsModalContainer = styled.div`
    position: absolute;
    /* width: 540px;
    height: 464px; */
    /* flex-direction: column; */
    /* margin-top: 100px; */
    border-radius: 25px;
    background-color: white;
    z-index: 100;
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
        background-color: ${(props) => colorBg[props.backgroundColor]};
        color: ${(props) => colorFont[props.color]};        
    }
`

const HeadingInputWrapper = styled.div`
    display: block;
`


function SettingsModal(props) {

const {showModal, closeModal} = props
const { selectedColor, onColorSelection, selectedFont, onFontSelection,  timeInputs, 
    // updateTimeInputs, 
    // updateTimeInputsUp, updateTimeInputsDown, 
    handleChanges } = useContext(settingsContext)

const [temporaryColor, setTemporaryColor] = useState(selectedColor);
const [temporaryFont, setTemporaryFont] = useState(selectedFont);
const [temporaryTimeInputs, setTemporaryTimeInputs] = useState(timeInputs)

const updateTimeInputs = (e) => {
    console.log("NEW VALUE:", e.target.value);
    console.log("WHICH TIMER?:", e.target.name);
    const max = 60
    // const limitedVal = e.target.value < max ? e.target.value : max;
    const limitedVal = Math.min( e.target.value, max )
    setTemporaryTimeInputs({ ...temporaryTimeInputs, [e.target.name]: limitedVal})
}

const updateTimeInputsUp = (e) => {
    console.log("show us what is e.target?", e.target.name, temporaryTimeInputs[e.target.name], temporaryTimeInputs[e.target.name] + 1)
    if (temporaryTimeInputs[e.target.name] < 60) {
    setTemporaryTimeInputs({ ...temporaryTimeInputs, [e.target.name]: temporaryTimeInputs[e.target.name] + 1 })}
}

const updateTimeInputsDown = (e) => {
    if (temporaryTimeInputs[e.target.name] > 0) {
    setTemporaryTimeInputs({ ...temporaryTimeInputs, [e.target.name]: temporaryTimeInputs[e.target.name] - 1 })}
}

  console.log("Is it getting update?", temporaryTimeInputs)

const submit = (e) => {
    e.preventDefault();
    console.log("submit")
    handleChanges(temporaryColor, temporaryFont, temporaryTimeInputs)    
}


  return (
    <ModalContainer showModal={showModal}>
    <SettingsModalContainer>
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
                        {props.fontOptions.map((font) => {
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
                        {props.colorOptions.map((color) => {
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