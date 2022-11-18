import React, { useContext } from 'react'
import styled from 'styled-components'
import { settingsContext } from '../../pages'
import ToggleLabel from './ToggleLabel'


const TripleToggleSwitchContainer = styled.div`
    background-color: rgba(22, 25, 50, 1);
    border-radius: 31.5px;
    padding: 7px;
    display: flex;
    position: absolute;
    margin-top: 85px;
`


export default function TripleToggleSwitch (props) {

    const { selectedColor, selectedFont } = useContext(settingsContext)
    
    return <TripleToggleSwitchContainer>
        <ToggleLabel
        selectedColor={selectedColor}
        selectedFont={selectedFont}
        span="pomodoro" 
        value="pomodoro"      
        />
        <ToggleLabel
        selectedColor={selectedColor}
        selectedFont={selectedFont}
        span="short break"
        value="shortBreak"
        />
        <ToggleLabel
        selectedColor={selectedColor}
        selectedFont={selectedFont}
        span="long break"
        value="longBreak"
        />
        </TripleToggleSwitchContainer>
}
