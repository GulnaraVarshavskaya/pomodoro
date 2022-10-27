import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../Button'
import RadioLabel from '../RadioLabel'
import FormInputLabel from '../molecules/FormInputLabel'
import Heading from '../Heading'
import checkIcon from '../../public/assets/icon-check.svg'

const fontOptions = []

const colorOptions = []

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

const SettingsFormContainer = styled.div`
    display: flex;
    position: relative;
    width: 540px;
    flex-direction: column;
    margin-top: 155px;
    border-radius: 25px;
    background-color: white;
    z-index: 5;
`

const SettingsFormHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(227, 225, 225, 1);
    padding: 32px 40px;
`

const CloseButton = styled.button`
    background-color: transparent;
    cursor: pointer;
    border: none;
    &:focus {
    outline: 0;
    } 
`

const SettingsFormBody = styled.div`
    padding: 24px 40px 50px;
`

const SettingsFormSection = styled.div`
    padding-bottom: 24px;
    margin-bottom: 24px;
    &:not(&:last-of-type) {
       border-bottom: 1px solid rgba(227, 225, 225, 1); 
    }   
`

const FormInputLabelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`

const RadioGroup = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FontRadioLabel = styled(RadioLabel)`
    span {
        font-size: 15px;
        font-weight: 400px;
        font-family: ${(props) => fontFamily[props.font]};
        background-color: ${(props) => colorBg[props.backgroundColor]};
        color: ${(props) => colorFont[props.color]};        
    }
`

const ColorRadioLabel = styled(RadioLabel)`
    span {
        background-color: ${(props) => colorBg[props.backgroundColor]};
    }
`



function SettingsForm() {

  return (
    <SettingsFormContainer>
        <SettingsFormHeader>
            <Heading
            size="headingL"
            color="dark"
            >
                Settings
            </Heading>
            <CloseButton>
                <img src="./assets/icon-close.svg" />
            </CloseButton>
        </SettingsFormHeader>
        <SettingsFormBody>
            <SettingsFormSection>
                <Heading
                size="headingS"
                letter="letterSpaceSmall"
                color="dark"
                >
                    TIME (MINUTES)
                </Heading>
                <FormInputLabelWrapper>
                    <FormInputLabel
                    label="pomodoro"
                    />
                    <FormInputLabel
                    label="short break"
                    />
                    <FormInputLabel
                    label="long break"
                    />
                </FormInputLabelWrapper>
            </SettingsFormSection>
            <SettingsFormSection>
                <Heading
                size="headingS"
                letter="letterSpaceSmall"
                color="dark"
                >
                    FONT
                </Heading>
                <RadioGroup>
                        <FontRadioLabel
                        backgroundColor="black"
                        color="light"
                        span="Aa"
                        >
                        </FontRadioLabel>   
                </RadioGroup>
            </SettingsFormSection>
            <SettingsFormSection>
                <Heading
                size="headingS"
                letter="letterSpaceSmall"
                color="dark"
                >
                    COLOR
                </Heading>
                <RadioGroup>
                        <ColorRadioLabel
                        >
                            <input
                                type="radio"
                            />
                            <span>
                                <img src={checkIcon} />
                            </span>
                        </ColorRadioLabel>
                        
                </RadioGroup>
            </SettingsFormSection>
            <Button
            backgroundColor="red"
            >Apply</Button>
        </SettingsFormBody>
    </SettingsFormContainer>
  )
}

export default SettingsForm