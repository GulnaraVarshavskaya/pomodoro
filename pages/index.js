import Heading from '../components/atoms/Heading'
import TripleToggleSwitch from '../components/molecules/TripleToggleSwitch'
import ProgressBar from '../components/organisms/ProgressBar'
import Settings from '../components/molecules/Settings'

import {useState, useEffect, createContext} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  margin: 0 auto;
  justify-content: center;
`
const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
`

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
`

const KUMBH_SANS = 'kumbhSans'
const ROBOTO_SLAB = 'robotoSlab'
const SPACE_MONO = 'spaceMono'

const fontOptions = [KUMBH_SANS, ROBOTO_SLAB, SPACE_MONO];

const red = "red"
const blue = "blue"  
const violet = "violet"

const colorOptions = [red, blue, violet];

export const settingsContext = createContext({});

export default function Home() {

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
      setShowModal(true)};
  const closeModal = () => {
      setShowModal(false)};

  const [timeInputs, setTimeInputs] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const [selectedFont, setSelectedFont] = useState(KUMBH_SANS)
  const [selectedColor, setSelectedColor] = useState(red)

  const [ mode, setMode ] = useState("pomodoro")

  const [totalTime, setTotalTime] = useState(timeInputs[mode]*60)
  const [timeRemaining, setTimeRemaining] = useState(totalTime);  
  const [isActive, setIsActive] = useState("start");

  const minutes = Math.floor(timeRemaining / 60)
  const remainingSeconds = timeRemaining % 60

  let progress = 100 / (totalTime / timeRemaining)
  
  const toggleAction = () => {
    if (isActive === "start") {
      setIsActive("pause")
    } else if (isActive === "restart") {
      restart()
    } else setIsActive("start")  
  }

  const restart = () => {
    setTotalTime(timeInputs[mode] * 60)
    setTimeRemaining(timeInputs[mode] * 60)
    setIsActive("start")
  }

  useEffect( () => {
    restart();
  }, [mode])

  useEffect(() => {
    let countdown = setInterval( () => {
      if (isActive !== "start") {
        setTimeRemaining( timeRemaining - 1)
      }
    }, 1000)
      if (timeRemaining <= 0) {
        clearInterval(countdown);
        setIsActive("restart")
    }
    return () => clearInterval(countdown);
  }, [isActive, timeRemaining])


  const handleChanges = (changedColor, changedFont, changedTimeInputs ) => {
    setSelectedColor(changedColor)
    setSelectedFont(changedFont)
    setTimeInputs(changedTimeInputs)
    setTotalTime(changedTimeInputs[mode] * 60)
    setTimeRemaining(changedTimeInputs[mode] * 60)
    setIsActive("start")

    closeModal();

  }

  return (
    <settingsContext.Provider value={{ colorOptions: colorOptions, fontOptions: fontOptions, selectedColor: selectedColor, setSelectedColor: setSelectedColor, selectedFont: selectedFont, timeInputs: timeInputs, handleChanges: handleChanges, mode: mode, setMode: setMode, toggleAction:toggleAction, showModal: showModal, openModal: openModal, closeModal: closeModal }}>
      <Container>
        <HeadContainer>
        <Heading
        color="light"
        size="headingL"
        font="kumbhSans"
        >pomodoro</Heading>       
        <TripleToggleSwitch
        /> 
        </HeadContainer>
        <TimerContainer>
        <ProgressBar
        seconds={remainingSeconds}
        minutes={minutes}
        progress={progress}
        actionName={isActive}
        /></TimerContainer>
        <Settings 
        />
      </Container>
    </settingsContext.Provider>
  )
}
