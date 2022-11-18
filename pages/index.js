import Heading from '../components/Heading'
import TripleToggleSwitch from '../components/molecules/TripleToggleSwitch'
import ProgressBar from '../components/organisms/ProgressBar'
import {useState, useEffect, createContext} from 'react'
import Settings from '../components/Settings'
import styled from 'styled-components'

const Container = styled.div`
  /* display: flex; */
  min-height: 100vh;
  padding: 50px 0;
  margin: 0 auto;
  justify-content: center;
`
const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
  /* position: absolute; */
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

  const updateTimeInputs = (e) => {
    console.log("NEW VALUE:", e.target.value);
    console.log("WHICH TIMER?:", e.target.name);
    const max = 60
    // const limitedVal = e.target.value < max ? e.target.value : max;
    const limitedVal = Math.min( e.target.value, max )
    setTimeInputs({ ...timeInputs, [e.target.name]: limitedVal})
  }

  const updateTimeInputsUp = (e) => {
    console.log("show us what is e.target?", e.target.name, timeInputs[e.target.name], timeInputs[e.target.name] + 1)
    if (timeInputs[e.target.name] < 60) {
    setTimeInputs({ ...timeInputs, [e.target.name]: timeInputs[e.target.name] + 1 })}
  }

  const updateTimeInputsDown = (e) => {
    if (timeInputs[e.target.name] > 0) {
    setTimeInputs({ ...timeInputs, [e.target.name]: timeInputs[e.target.name] - 1 })}
  }

  const [selectedFont, setSelectedFont] = useState(KUMBH_SANS)
  const [selectedColor, setSelectedColor] = useState(red)

  const onFontSelection = ((font) => {
    setSelectedFont(font)});

  const onColorSelection = ((color) => {
    setSelectedColor(color)
    
});

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
    // console.log("What is timeInputs[mode]" ,timeInputs[mode])
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
    console.log("apply changes", changedTimeInputs)
    setSelectedColor(changedColor)
    setSelectedFont(changedFont)
    setTimeInputs(changedTimeInputs)
    setTotalTime(changedTimeInputs[mode] * 60)
    setTimeRemaining(changedTimeInputs[mode] * 60)
    setIsActive("start")

    // e.preventDefault()
    // console.log(applyChanges)
    // setApplyChanges({
    //   pomodoro: 25,
    //   shortBreak: 5,
    //   longBreak: 15,
    // }, selectedColor, selectedFont)
    // setApplyChanges({...applyChanges});
    // setTotalTime(timeInputs[mode] * 60)
    // setTimeRemaining(timeInputs[mode] * 60)
    closeModal();

  }

  return (
    <settingsContext.Provider value={{ selectedColor: selectedColor, setSelectedColor: setSelectedColor, onColorSelection: onColorSelection, selectedFont: selectedFont, onFontSelection: onFontSelection, timeInputs: timeInputs, updateTimeInputs: updateTimeInputs, updateTimeInputsUp: updateTimeInputsUp, updateTimeInputsDown: updateTimeInputsDown, handleChanges: handleChanges, mode: mode, setMode: setMode, toggleAction:toggleAction, showModal: showModal, openModal: openModal, closeModal: closeModal }}>
      <Container>
        <HeadContainer>
        <Heading
        color="light"
        size="headingXl"
        font="kumbhSans"
        >pomodoro</Heading>       
        <TripleToggleSwitch
        selectedColor={selectedColor}
        selectedFont={selectedFont}
        /> 
        </HeadContainer>
        <TimerContainer>
        <ProgressBar
        selectedColor={selectedColor}
        selectedFont={selectedFont}
        seconds={remainingSeconds}
        minutes={minutes}
        progress={progress}
        actionName={isActive}
        /></TimerContainer>
        <Settings 
        colorOptions={colorOptions}
        fontOptions={fontOptions}
        />

      </Container>
    </settingsContext.Provider>
  )
}
