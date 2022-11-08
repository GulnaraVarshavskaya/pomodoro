import Heading from '../components/Heading'
import TripleToggleSwitch from '../components/molecules/TripleToggleSwitch'
import ProgressBar from '../components/organisms/ProgressBar'
import {useState, useEffect, createContext} from 'react'
import Settings from '../components/Settings'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 50px 0;
  margin: 0 auto;
  justify-content: center;
`
const DIV = styled.div`
  position: absolute;
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

  // const [applyChanges, setApplyChanges] = useState(true)

  // const handleChanges = (e) => {
  //   e.preventDefault()
  //   setApplyChanges()
  // }
  

  const [numberPomodoro, setNumberPomodoro] = useState(0)
  const [numberShortBreak, setNumberShortBreak] = useState(0)
  const [numberLongBreak, setNumberLongBreak] = useState(0)

  const handleNumberPomodoro = (e) => {setNumberPomodoro(e.target.value)}
  const handleNumberShortBreak = (e) => {setNumberShortBreak(e.target.value)}
  const handleNumberLongBreak = (e) => {setNumberLongBreak(e.target.value)}

  const handleClickUpPomodoro = () => {    
    setNumberPomodoro(numberPomodoro + 1)
  }
  const handleClickUpShortBreak = () => {    
    setNumberShortBreak(numberShortBreak + 1)
  }
  const handleClickUpLongBreak = () => {    
    setNumberLongBreak(numberLongBreak + 1)
  }

  const handleClickDownPomodoro = () => { 
      if(numberPomodoro > 0) {   
      setNumberPomodoro(numberPomodoro - 1)
      }
  }
  const handleClickDownShortBreak = () => { 
    if(numberShortBreak > 0) {   
    setNumberShortBreak(numberShortBreak - 1)
    }
}
const handleClickDownLongBreak = () => { 
  if(numberLongBreak > 0) {   
  setNumberLongBreak(numberLongBreak - 1)
  }
}

  const [selectedFont, setSelectedFont] = useState(SPACE_MONO)
  const [selectedColor, setSelectedColor] = useState(red)

  const onFontSelection = ((font) => {
    setSelectedFont(font)});

  const onColorSelection = ((e) => {
    setSelectedColor(e)
    
});

  const [totalTime, setTotalTime] = useState(25*60)
  const [timeRemaining, setTimeRemaining] = useState(totalTime);  
  const [isActive, setIsActive] = useState("pause");

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
    setTimeRemaining(totalTime)
    setIsActive("pause")
  }

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
  }, [isActive, timeRemaining, progress])


  return (
    <settingsContext.Provider value={{ selectedColor: selectedColor, setSelectedColor: setSelectedColor, onColorSelection: onColorSelection, selectedFont: selectedFont, onFontSelection: onFontSelection, numberPomodoro: numberPomodoro, handleNumberPomodoro: handleNumberPomodoro, handleClickUpPomodoro: handleClickUpPomodoro, handleClickDownPomodoro: handleClickDownPomodoro, numberShortBreak: numberShortBreak, handleNumberShortBreak: handleNumberShortBreak, handleClickUpShortBreak: handleClickUpShortBreak, handleClickDownShortBreak: handleClickDownShortBreak, numberLongBreak: numberLongBreak, handleNumberLongBreak: handleNumberLongBreak, handleClickUpLongBreak: handleClickUpLongBreak, handleClickDownLongBreak: handleClickDownLongBreak }}>
      <Container>
        <DIV>
        <Heading
        color="light"
        size="headingXl"
        font="kumbhSans"
        >pomodoro</Heading></DIV>
        <TripleToggleSwitch
        selectedColor={selectedColor}
        selectedFont={selectedFont}
        />
        <ProgressBar
        selectedColor={selectedColor}
        selectedFont={selectedFont}
        seconds={remainingSeconds}
        minutes={minutes}
        progress={progress}
        toggleAction={toggleAction}
        actionName={isActive}
        />
        <Settings 
        colorOptions={colorOptions}
        fontOptions={fontOptions}
        />

      </Container>
    </settingsContext.Provider>
  )
}
