import styled from 'styled-components'
import React, { useContext } from 'react'
import { settingsContext } from '../../pages'

const colors = {
  red: "rgba(248, 112, 112, 1)",
  blue: "rgba(112, 243, 248, 1)",
  violet: "rgba(216, 129, 248, 1)"
}

const fonts = {
  kumbhSans: "'Kumbh Sans', sans-serif;",
  robotoSlab: "'Roboto Slab', serif",
  spaceMono: "'Space Mono', monospace",
}

const TimerContainer = styled.div`

`

const WrapperSvg = styled.div`
  width: 410px;
  height: 410px;
  background: linear-gradient(315deg, #2E325A 0%, #0E112A 100%);
  border-radius: 50%;
  box-shadow: -50px -50px 100px #272C5A, 50px 50px 100px #121530;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: 200px;
  margin-bottom: 63px;  
`

const ProgressCircleSvg = styled.svg`
  width: 366px;
  height: 366px;
  border-radius: 50%;
  background-color: rgba(22, 25, 50, 1);
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  /* text-anchor: middle;
  dominant-baseline: middle; */
`

const ProgressCircleTrack = styled.circle`
  stroke-width: 11px;
  stroke: rgba(22, 25, 50, 1);
  fill: transparent;
`

const ProgressCircleIndicator = styled.circle`
  stroke-width: 11px;
  stroke: ${(props) => colors[props.selectedColor]};
  stroke-linecap: round;
  fill: transparent;
  transform: rotate(-90deg);
  transform-origin: center;
`

const TimeCountdown = styled.text`
  font-size: 100px;
  font-family: ${(props) => fonts[props.selectedFont]};
  font-weight: bold;
  line-height: 101px;
  letter-spacing: -5px;
  color: white;
  text-anchor: middle;
  dominant-baseline: middle;
  fill: white;
`

const ForeignObject = styled.foreignObject`
  overflow: visible;
`

const ForeignObjectDivForButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

const ActionButton = styled.button`
  border: none;
  letter-spacing: 15px;
  font-size: 16px;
  font-family: ${(props) => fonts[props.selectedFont]};
  font-weight: 700px;
  line-height: 16px;
  text-transform: uppercase;
  color: white;
  background-color: transparent;
  margin-top: 40px;
  margin-right: -15px;
  &:focus {
    outline: 0;
  }
`

export default function ProgressBar(props) { 

  let {
    size = 366,
    progress,
    trackWidth = 11,
    indicatorWidth = 11,
    addToRadius = 13,
    seconds,
    minutes,
    actionName
  } = props

  const center = size / 2
  const radius = center - addToRadius - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth)
  const dashArray = 2 * Math.PI * radius  
  // const offsetRadius = (100 - progress) * (radius / 100)
  // const dashOffset = 2 * Math.PI * offsetRadius
 
  const dashOffset = dashArray * (progress / 100)

  const {toggleAction, selectedFont, selectedColor} = useContext(settingsContext)
  
  return (
    <TimerContainer>
    <WrapperSvg>
      <ProgressCircleSvg>
        <ProgressCircleTrack
          cx={radius}
          cy={radius}
          r={radius}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
        <ProgressCircleIndicator
          cx={center}
          cy={center}
          r={radius}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          selectedColor={selectedColor}
        />
        <TimeCountdown
          height="100"
          x={center}
          y={center}
          selectedFont={selectedFont}
          >
          {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
        </TimeCountdown>
        <ForeignObject
          x={center}
          y={center} 
          >
            <body xmlns="http://www.w3.org/1999/xhtml">
              <ForeignObjectDivForButton>
                <ActionButton
                selectedFont={selectedFont}
                onClick={toggleAction}>
                  {actionName}
                </ActionButton>
              </ForeignObjectDivForButton>
            </body>
        </ForeignObject>
      </ProgressCircleSvg>
    </WrapperSvg></TimerContainer>
  )
}
