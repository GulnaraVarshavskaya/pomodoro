import React from 'react'
import styled from 'styled-components'
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
    
    return <TripleToggleSwitchContainer>
        <ToggleLabel
        selectedColor={props.selectedColor}
        selectedFont={props.selectedFont}
        span="pomodoro" 
        value="pomodoro"      
        />
        <ToggleLabel
        selectedColor={props.selectedColor}
        selectedFont={props.selectedFont}
        span="short break"
        value="shortBreak"
        />
        <ToggleLabel
        selectedColor={props.selectedColor}
        selectedFont={props.selectedFont}
        span="long break"
        value="longBreak"
        />
        </TripleToggleSwitchContainer>
}
