import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { settingsContext } from "../../pages";
import { v4 as uuid } from "uuid";
import ProjectHeader from "./ProjectHeader";
import Projects from "./Projects";
import Tasks from "./Tasks";
import {
  createProject,
  renameProject,
  deleteProject,
  fetchProjects,
} from "../../services/projects";
import { createTask, renameTask, fetchTasks } from "../../services/tasks";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToDoListModalContainer = styled.div`
  position: fixed;
  inset: calc((100vh - 580px) / 2) calc((100vw - 328px) / 2);
  border-radius: 25px;
  background-color: white;
  z-index: 100;
  @media only screen and (min-width: 768px) {
    inset: calc((100vh - 464px) / 2) calc((100vw - 540px) / 2);
  } ;
`;

function ToDoListModal() {
  const { showModal, closeModal, restart, updateStatesIndex } =
    useContext(settingsContext);

  const [state, setState] = useState({
    projects: [],
    selectedProjectId: null,
    projectInEditModeId: null,
    projectTitle: "",
    projectEditTitle: "",
    taskTitle: "",
    taskEditTitle: "",
    selectedTaskId: null,
    showInput: false,
    showDoneBtn: false,
    showModalMenuListId: null,
    showCompletedTasks: false,
  });

  function updateStates(updates) {
    setState((oldState) => {
      return { ...oldState, ...updates };
    });
  }

  async function handleFetchProjects() {
    const data = await fetchProjects();
    updateStates({ projects: data.projects });
  }

  useEffect(() => {
    handleFetchProjects();
  }, []);

  useEffect(() => {
    const closeModal = (e) => {
      if (
        e.key === "Escape" &&
        state.showInput === false &&
        state.projectInEditModeId === null &&
        state.selectedTaskId === null &&
        state.selectedProjectId === null
      ) {
        updateStatesIndex({ showModal: null });
      } else if (e.key === "Escape" && state.showInput === true) {
        updateStates({ showInput: false, showDoneBtn: false });
      } else if (e.key === "Escape" && state.projectInEditModeId !== null) {
        updateStates({ projectInEditModeId: null, showDoneBtn: false });
      } else if (e.key === "Escape" && state.selectedTaskId !== null) {
        updateStates({ selectedTaskId: null, showDoneBtn: false });
      } else if (e.key === "Escape" && state.selectedProjectId !== null) {
        updateStates({ selectedProjectId: null });
      }
    };
    window.addEventListener("keydown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  }, [
    state.showInput,
    state.projectInEditModeId,
    state.selectedTaskId,
    state.selectedProjectId,
  ]);

  async function handleCreateProject() {
    console.log("hey create");
    const newProject = {
      id: uuid(),
      title: state.projectTitle,
      tasks: [],
    };
    const updatedProjects = [...state.projects, newProject];

    updateStates({
      projects: updatedProjects,
      showInput: false,
      showDoneBtn: false,
    });

    await createProject(newProject);
  }

  function handleRenameProject(projectId) {
    console.log("Rename project");
    if (projectId !== null) {
      const updatedProject = state.projects.find((project) => {
        return project.id === projectId;
      });
      updateStates({
        projectInEditModeId: projectId,
        projectEditTitle: updatedProject.title,
        showDoneBtn: true,
        showModalMenuListId: null,
      });
    } else {
      updateStates({ showDoneBtn: false, projectInEditModeId: null });
    }
  }

  const handleUpdateProject = async () => {
    console.log("hey");
    // we mapping the array of projects and return new array of updated project
    const updatedProjects = state.projects.map((project) => {
      // if the id of the project we are mapping over matches with the project id in edit mode
      if (project.id === state.projectInEditModeId) {
        // return an object. id, included tasks stay the same, title is going to change
        return {
          // id: project.id,
          // tasks: project.tasks,
          ...project,
          title: state.projectEditTitle,
        };
      }
      // if the project wasn't updated just return it in a new array
      return project;
    });

    // we're calling the setter and triggering rerender (update state)
    // by setting this state to null, all projects are displayed normally (no input field anywhere). Close the input
    updateStates({
      projects: updatedProjects,
      showDoneBtn: false,
      projectInEditModeId: null,
    });

    await renameProject(state.projectInEditModeId, state.projectEditTitle);
  };

  async function handleDeleteProject(projectId) {
    const deletedProject = state.projects.filter((project) => {
      return project.id !== projectId;
    });
    updateStates({ projects: deletedProject });

    await deleteProject(projectId);
  }

  const handleClickOutsideProjects = (event) => {
    console.log("event", event);
    const isTargetNotDoneBtn = event.target.innerText !== "Done";
    if (isTargetNotDoneBtn) {
      console.log("Hello");
      handleRenameProject(null);
    }
  };

  const refProject = useOutsideClick(handleClickOutsideProjects, [
    state.selectedProjectId,
  ]);

  async function handleCheckboxClick(id, completed, completedTasksCount) {
    if (completed === true && completedTasksCount === 1) {
      updateStates({ showCompletedTasks: false });
    }
    // when user clicks checkbox this function will be executed
    // id - id of task,
    // completed - when the checkbox is empty the value is false and when the checkbox is checked - it's true

    // here we mapping whole array of projects and return new array of updated project
    const updatedProjects = state.projects.map((project) => {
      // if the project we are mapping over is the selected project then we're going to do something
      if (project.id === state.selectedProjectId) {
        // in the selected project we're mapping tasks to find the right task

        const updatedTasks = project.tasks.map((task) => {
          // if the id of task matches with task id that was updated on the backend
          if (task.id === id) {
            // return an object. id, title, projectId stay the same, completed is going to change
            return {
              // id: task.id,
              // title: task.title,
              // projectId: task.projectId,
              ...task,
              completed: !completed,
            };
          }
          // if the task wasn't updated just return it in a new array
          else {
            return task;
          }
        });

        // we're replacing the old array of tasks with the new one
        project.tasks = updatedTasks;
      }
      // when we're mapping we always need to return project otherwise it's going to be undefind
      return project;
    });

    // we're calling the setter and triggering rerender
    updateStates({ projects: updatedProjects });

    // optimistic update
    await fetchTasks(id, completed);
  }

  async function handleCreateTask() {
    const newTask = {
      id: uuid(),
      title: state.taskTitle,
      projectId: state.selectedProjectId,
      completed: false,
    };
    const updatedProjects = state.projects.map((project) => {
      if (project.id === state.selectedProjectId) {
        return {
          ...project,
          tasks: [...project.tasks, newTask],
        };
      }
      return project;
    });
    updateStates({
      projects: updatedProjects,
      showInput: false,
      showDoneBtn: false,
    });

    await createTask(state.selectedProjectId, newTask);
  }

  async function handleUpdateTask() {
    const updatedProjects = state.projects.map((project) => {
      if (project.id === state.selectedProjectId) {
        const updatedTasks = project.tasks.map((task) => {
          if (task.id === state.selectedTaskId) {
            return {
              ...task,
              title: state.taskEditTitle,
            };
          } else {
            return task;
          }
        });
        project.tasks = updatedTasks;
      }
      return project;
    });
    updateStates({
      projects: updatedProjects,
      showDoneBtn: false,
      selectedTaskId: null,
    });

    await renameTask(state.selectedTaskId, state.taskEditTitle);
  }

  const startTimer = () => {
    closeModal();
    restart();
  };
  console.log("state.selectedProjectId", state.selectedProjectId);
  console.log("state.projectInEditModeId", state.projectInEditModeId);
  return (
    <settingsContext.Provider
      value={{
        showModalMenuListId: state.showModalMenuListId,
        updateStates,
        handleDeleteProject,
        handleRenameProject,
      }}
    >
      <ModalContainer showModal={showModal}>
        <ToDoListModalContainer>
          {state.selectedProjectId ? (
            <ProjectHeader
              {...state}
              updateStates={updateStates}
              create={handleCreateTask}
              closeModal={closeModal}
              rename={handleUpdateTask}
            />
          ) : (
            <ProjectHeader
              {...state}
              updateStates={updateStates}
              create={handleCreateProject}
              closeModal={closeModal}
              rename={handleUpdateProject}
            />
          )}

          {state.selectedProjectId ? (
            <Tasks
              {...state}
              updateStates={updateStates}
              handleCheckboxClick={handleCheckboxClick}
              handleCreateTask={handleCreateTask}
              handleUpdateTask={handleUpdateTask}
              startTimer={startTimer}
            />
          ) : (
            <Projects
              {...state}
              updateStates={updateStates}
              handleCreateProject={handleCreateProject}
              handleUpdateProject={handleUpdateProject}
              refProject={refProject}
            />
          )}
        </ToDoListModalContainer>
      </ModalContainer>
    </settingsContext.Provider>
  );
}

export default ToDoListModal;
