import styled from 'styled-components'
import React, {useState, useEffect} from 'react'

const WrapperSvg = styled.div`
  width: 410px;
  height: 410px;
  background: linear-gradient(315deg, #2E325A 0%, #0E112A 100%);
  border-radius: 50%;
  box-shadow: -50px -50px 100px #272C5A, 50px 50px 100px #121530;
  align-items: center;
  justify-content: center;
  display: flex;
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
`

const ProgressCircleTrack = styled.circle`
  stroke-width: 11px;
  stroke: rgba(22, 25, 50, 1);
  fill: transparent;
`

const ProgressCircleIndicator = styled.circle`
  stroke-width: 11px;
  stroke: rgba(248, 112, 112, 1);
  stroke-linecap: round;
  fill: transparent;
  transform: rotate(-90deg);
  transform-origin: center;
`

const TimeCountdown = styled.text`
  font-size: 100px;
  font-family: 'Kumbh Sans';
  font-weight: bold;
  line-height: 101px;
  letter-spacing: -5px;
  color: white;
  text-anchor: middle;
  fill: white;
`

const ForeignObject = styled.foreignObject`
  overflow: visible;
`

const ForeignObjectDivForButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ActionButton = styled.button`
  border: none;
  letter-spacing: 15px;
  font-size: 16px;
  font-family: 'Kumbh Sans';
  font-weight: 700px;
  line-height: 16.09px;
  text-transform: uppercase;
  color: white;
  background-color: transparent;
  margin-top: 20px;
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
    actionName,
    toggleAction
  } = props

  const center = size / 2
  const radius = center - addToRadius - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth)
  console.log(radius)
  const dashArray = 2 * Math.PI * radius  
  // const offsetRadius = (100 - progress) * (radius / 100)
  // const dashOffset = 2 * Math.PI * offsetRadius
 
  const dashOffset = dashArray * (progress / 100)

  return (
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
        />
        <TimeCountdown
          x={center}
          y={center}
          onClick={() => alert('You have clicked the circle.')}
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
                
                onClick={toggleAction}>
                  {actionName}
                </ActionButton>
              </ForeignObjectDivForButton>
            </body>
        </ForeignObject>
      </ProgressCircleSvg>
    </WrapperSvg>
  )
}
