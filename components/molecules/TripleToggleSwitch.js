import React, { useContext } from 'react'
import styled from 'styled-components'
import { settingsContext } from '../../pages'
import ToggleLabel from './ToggleLabel'
import PropTypes from 'prop-types';

const marginsMobile = {
    margin: "60px 0 50px"
}

const marginsDesktop = {
    margin: "85px 0 50px"
}


const TripleToggleSwitchContainer = styled.div`
    background-color: rgba(22, 25, 50, 1);
    border-radius: 31.5px;
    padding: 7px;
    display: flex;
    position: absolute;
    margin: ${(props) => marginsMobile[props.margin]};
    @media only screen and (min-width: 768px){
        margin: ${(props) => marginsDesktop[props.margin]};
    };
`


export default function TripleToggleSwitch () {

    const { selectedColor, selectedFont } = useContext(settingsContext)
    
    return <TripleToggleSwitchContainer
    margin="margin"
    >
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

TripleToggleSwitch.propTypes = {
    margin: PropTypes.oneOf(["margin"]).isRequired,
}
