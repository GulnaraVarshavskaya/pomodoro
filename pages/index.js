import styles from '../styles/Home.module.css'
import TripleToggleSwitch from '../components/molecules/TripleToggleSwitch'
import ProgressBar from '../components/organisms/ProgressBar'
import react, {useState, useEffect} from 'react'
import SettingsForm from '../components/organisms/SettingsForm'

export default function Home() {
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
    <div className={styles.container}>

      {/* <TripleToggleSwitch /> */}
      {/* <ProgressBar
      seconds={remainingSeconds}
      minutes={minutes}
      progress={progress}
      toggleAction={toggleAction}
      actionName={isActive}
      /> */}
      <SettingsForm />

    </div>
  )
}
