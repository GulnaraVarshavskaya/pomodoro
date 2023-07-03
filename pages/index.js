import Heading from "../components/atoms/Heading";
import TripleToggleSwitch from "../components/molecules/TripleToggleSwitch";
import ProgressBar from "../components/organisms/ProgressBar";
import Settings from "../components/molecules/Settings";
import ToDoList from "../components/molecules/ToDoList";
import Head from "next/head";

import { useState, useEffect, createContext } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  margin: 0 auto;
  justify-content: center;
`;
const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SettingsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 200px;
`;

const KUMBH_SANS = "kumbhSans";
const ROBOTO_SLAB = "robotoSlab";
const SPACE_MONO = "spaceMono";

const fontOptions = [KUMBH_SANS, ROBOTO_SLAB, SPACE_MONO];

const red = "red";
const blue = "blue";
const violet = "violet";

const colorOptions = [red, blue, violet];

export const settingsContext = createContext({});

export default function Home() {
  const [state, setState] = useState({
    showModal: null,
    timeInputs: {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
    },
    selectedFont: KUMBH_SANS,
    selectedColor: red,
    mode: "pomodoro",
    totalTime: 25 * 60,
    timeRemaining: 25 * 60,
    isActive: "pause",
  });

  function updateStatesIndex(updates) {
    setState((state) => {
      return { ...state, ...updates };
    });
  }

  const openSettingsModal = () => {
    updateStatesIndex({ showModal: "settings" });
  };

  const openTodoListModal = () => {
    updateStatesIndex({ showModal: "todoList" });
  };
  const closeModal = () => {
    updateStatesIndex({ showModal: null });
  };

  const minutes = Math.floor(state.timeRemaining / 60);
  const remainingSeconds = state.timeRemaining % 60;

  let progress = 100 / (state.totalTime / state.timeRemaining);

  const toggleAction = () => {
    if (state.isActive === "pause") {
      updateStatesIndex({ isActive: "start" });
    } else if (state.isActive === "restart") {
      reset();
    } else updateStatesIndex({ isActive: "pause" });
  };

  const reset = () => {
    updateStatesIndex({
      totalTime: state.timeInputs[state.mode] * 60,
      timeRemaining: state.timeInputs[state.mode] * 60,
      isActive: "pause",
    });
  };

  const restart = () => {
    updateStatesIndex({
      totalTime: state.timeInputs[state.mode] * 60,
      timeRemaining: state.timeInputs[state.mode] * 60,
      isActive: "start",
    });
  };

  useEffect(() => {
    reset();
  }, [state.mode]);

  useEffect(() => {
    let countdown = setInterval(() => {
      if (state.isActive !== "pause") {
        updateStatesIndex({ timeRemaining: state.timeRemaining - 1 });
      }
    }, 1000);
    if (state.timeRemaining <= 0) {
      clearInterval(countdown);
      updateStatesIndex({ isActive: "restart" });
    }
    return () => clearInterval(countdown);
  }, [state.isActive, state.timeRemaining]);

  const handleChanges = (changedColor, changedFont, changedTimeInputs) => {
    updateStatesIndex({
      selectedColor: changedColor,
      selectedFont: changedFont,
      timeInputs: changedTimeInputs,
      totalTime: changedTimeInputs[state.mode] * 60,
      timeRemaining: changedTimeInputs[state.mode] * 60,
      isActive: "pause",
    });

    closeModal();
  };

  return (
    <settingsContext.Provider
      value={{
        ...state,
        updateStatesIndex,
        colorOptions,
        fontOptions,
        handleChanges,
        toggleAction,
        openSettingsModal,
        openTodoListModal,
        closeModal,
        restart,
      }}
    >
      <Container>
        <Head>
          <meta property="og:title" content="Pomodoro" />
          <meta
            property="og:image"
            content="https://pomodoro-mu-eight.vercel.app"
          />
          <meta property="og:type" content="image&infos" />
          <meta
              property="og:image:type"
              content="https://pomodoro-mu-eight.vercel.app/svg+xml"
            />
          <meta
            property="og:site_name"
            content="https://pomodoro-mu-eight.vercel.app"
          />
          <meta
            property="og:description"
            content=
              "Pomodoro app helps stay focused by working  a set amount of minutes taking a short or a long break. This app combines pomodoro technique and todo list into one place."
          />
        </Head>
        <HeadContainer>
          <Heading color="light" size="headingL" font="kumbhSans">
            pomodoro
          </Heading>
          <TripleToggleSwitch />
        </HeadContainer>
        <TimerContainer>
          <ProgressBar
            {...state}
            updateStatesIndex={updateStatesIndex}
            seconds={remainingSeconds}
            minutes={minutes}
            progress={progress}
            actionName={state.isActive}
          />
        </TimerContainer>
        <SettingsContainer>
          <ToDoList {...state} updateStatesIndex={updateStatesIndex} />
          <Settings {...state} updateStatesIndex={updateStatesIndex} />
        </SettingsContainer>
      </Container>
    </settingsContext.Provider>
  );
}
