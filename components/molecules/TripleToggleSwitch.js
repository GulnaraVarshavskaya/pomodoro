import React from 'react'
import styled from 'styled-components'
import ToggleLabel from './ToggleLabel'


const TripleToggleSwitchContainer = styled.div`
    background-color: rgba(22, 25, 50, 1);
    border-radius: 31.5px;
    padding: 7px;
    display: flex;
    position: absolute;
`


export default function TripleToggleSwitch (props) {
    return <TripleToggleSwitchContainer>
        <ToggleLabel
        span="pomodoro"       
        />
        <ToggleLabel
        span="short break"
        />
        <ToggleLabel
        span="long break"
        />
        </TripleToggleSwitchContainer>
}
