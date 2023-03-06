import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { settingsContext } from "../../pages";
import { v4 as uuid } from "uuid";
import ProjectHeader from "./ProjectHeader";
import Projects from "./Projects";
import Tasks from "./Tasks";
import { createProject, renameProject, deleteProject, fetchProjects } from "../../services/projects";
import { createTask, renameTask, fetchTasks } from "../../services/tasks"
import { useOutsideClick } from "../../hooks/useOutsideClick"

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
  const { showModal, closeModal, toggleAction, restart, setShowModal } =
    useContext(settingsContext);

  const [projects, setProjects] = useState([]);

  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [projectInEditModeId, setProjectInEditModeId] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");

  const [taskEditTitle, setTaskEditTitle] = useState("");
  const [projectEditTitle, setProjectEditTitle] = useState("");

  const [taskTitle, setTaskTitle] = useState("");

  const [showInput, setShowInput] = useState(false);
  const [showDoneBtn, setShowDoneBtn] = useState(false);
  const [showModalMenuListId, setShowModalMenuListId] = useState(null);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);


  async function handleFetchProjects() {

    const data = await fetchProjects();

    setProjects(data.projects);
  }

  useEffect(() => {
    handleFetchProjects();
  }, []);

  const selectedProject = projects.find((project) => {
    return project.id === selectedProjectId;
  });


  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === "Escape" && showInput === false && projectInEditModeId === null && selectedTaskId === null && selectedProjectId === null) {
        setShowModal(null)
      }
      else if (e.key === "Escape" && showInput === true) {
        setShowInput(false)
        setShowDoneBtn(false);
      } else if (e.key === "Escape" && projectInEditModeId !== null) {
        setProjectInEditModeId(null);
      }  else if (e.key === "Escape" && selectedTaskId !== null) {
        setSelectedTaskId(null);
      } else if (e.key === "Escape" && selectedProjectId !== null) {
        setSelectedProjectId(null)
      }
    }
    window.addEventListener("keydown", closeModal)
    return () => {
      window.removeEventListener("keydown", closeModal)
    }
  }, [showInput, projectInEditModeId, selectedTaskId, selectedProjectId])


  function handleAddProject() {
    setShowInput(true);
    setShowDoneBtn(true);
    setProjectTitle("");
  }

  function createProjectEnterKey(e) {
    if (e.key === "Enter") {
      handleCreateProject();
    } 
    else {
      setProjectTitle(e.target.value);
    }
  }

  async function handleCreateProject() {
    const newProject = {
      id: uuid(),
      title: projectTitle,
    };
    const updatedProjects = [...projects, newProject];

    setProjects(updatedProjects);
    setShowInput(false);
    setShowDoneBtn(false);

    await createProject(newProject);
  }

  function handleRenameProject(projectId) {
    setProjectInEditModeId(projectId);
    if (projectId !== null) {  
    const updatedProject = projects.find((project) => {
      return project.id === projectId;
    });
    setProjectEditTitle(updatedProject.title);
    setShowDoneBtn(true);
    setShowModalMenuListId(null);}
    else {
      setShowDoneBtn(false);
    }
  }

  function handleEnterKeyRenameProject(e) {
    // when user press Enter this function will be executed
    if (e.key === "Enter") {
      handleUpdateProject();
    }   
    else {
      //when users don't press Enter they can continue typing in the input
      setProjectEditTitle(e.target.value);
    }
  }

  const handleUpdateProject = async () => {
    // we mapping the array of projects and return new array of updated project
    const updatedProjects = projects.map((project) => {
      // if the id of the project we are mapping over matches with the project id in edit mode
      if (project.id === projectInEditModeId) {
        // return an object. id, included tasks stay the same, title is going to change
        return {
          // id: project.id,
          // tasks: project.tasks,
          ...project,
          title: projectEditTitle,
        };
      }
      // if the project wasn't updated just return it in a new array
      return project;
    });

    // we're calling the setter and triggering rerender (update state)
    setProjects(updatedProjects);
    // by setting this state to null, all projects are displayed normally (no input field anywhere). Close the input
    setShowDoneBtn(false);
    setProjectInEditModeId(null);

    await renameProject(projectInEditModeId, projectEditTitle);
  };

  async function handleDeleteProject(projectId) {
    const deletedProject = projects.filter((project) => {
      return project.id !== projectId;
    });
    setProjects(deletedProject);

    await deleteProject(projectId);
  }


  const handleClickOutsideTasksCancelCreate = (event) => {
    const isTargetNotDoneBtn = event.target.innerText !== "Done";
    if (isTargetNotDoneBtn) {
    setShowInput(false);
    setShowDoneBtn(false);
    };
  };

  const handleClickOutsideTasks = (event) => {
    const isTargetNotDoneBtn = event.target.innerText !== "Done";
    if (isTargetNotDoneBtn) {
      handleUpdateTask();
    };
  };

  const refTask = useOutsideClick(handleClickOutsideTasks, [selectedTaskId]);

  const refCancel = useOutsideClick(handleClickOutsideTasksCancelCreate, [
    showInput,
  ]);
  
  const handleClickOutsideProjects = (event) => {
    console.log("event", event)
    const isTargetNotDoneBtn = event.target.innerText !== "Done";
    if (isTargetNotDoneBtn) {
      handleRenameProject(null);
    }    
  };

  const handleClickOutsideProjectsCancelCreate = (event) => {
    const isTargetNotDoneBtn = event.target.innerText !== "Done";
    if (isTargetNotDoneBtn) {
    setShowModalMenuListId(null);
    setShowInput(false);
    setShowDoneBtn(false);
    }
  };

  const refProject = useOutsideClick(handleClickOutsideProjects, [
    selectedProjectId,
  ]);

  const refProjectCancel = useOutsideClick(
    handleClickOutsideProjectsCancelCreate,
    [showInput]
  );

  async function handleCheckboxClick(id, completed, completedTasksCount) {
    if (completed === true && completedTasksCount === 1) {
      setShowCompletedTasks(false);
    }
    // when user clicks checkbox this function will be executed
    // id - id of task,
    // completed - when the checkbox is empty the value is false and when the checkbox is checked - it's true

    // here we mapping whole array of projects and return new array of updated project
    const updatedProjects = projects.map((project) => {
      // if the project we are mapping over is the selected project then we're going to do something
      if (project.id === selectedProjectId) {
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
    setProjects(updatedProjects);

    // optimistic update
    await fetchTasks(id, completed);
  }


  function handleAddTask() {
    setShowInput(true);
    setShowDoneBtn(true);
    setTaskTitle("");
  }

  function createTaskEnterKey(e) {
    if (e.key === "Enter") {
      handleCreateTask();
    } 
    else {
      setTaskTitle(e.target.value);
    }
  }

  async function handleCreateTask() {
    const newTask = {
      id: uuid(),
      title: taskTitle,
      projectId: selectedProjectId,
      completed: false,
    };
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProjectId) {
        return {
          ...project,
          tasks: [...project.tasks, newTask],
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    setShowInput(false);
    setShowDoneBtn(false);

    await createTask(selectedProjectId, newTask);
  }

  function handleRenameTask(id, title) {
    console.log("selectedId:" + id);
    setSelectedTaskId(id);
    setTaskEditTitle(title);
    setShowDoneBtn(true);
  }

  function renameTaskEnterKey(e) {
    if (e.key === "Enter") {
      handleUpdateTask();
    } 
    else {
      setTaskEditTitle(e.target.value);
    }
  }

  async function handleUpdateTask() {
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProjectId) {
        const updatedTasks = project.tasks.map((task) => {
          if (task.id === selectedTaskId) {
            return {
              ...task,
              title: taskEditTitle,
            };
          } else {
            return task;
          }
        });
        project.tasks = updatedTasks;
      }
      return project;
    });
    setProjects(updatedProjects);
    setShowDoneBtn(false);
    setSelectedTaskId(null);

    await renameTask(selectedTaskId, taskEditTitle);
  }

  const startTimer = () => {
    closeModal();
    restart();
  };

  return (
    <settingsContext.Provider
      value={{
        showModalMenuListId,
        refProjectCancel,
        handleDeleteProject,
        handleRenameProject,
      }}
    >
      <ModalContainer showModal={showModal}>
        <ToDoListModalContainer>
          {selectedProjectId ? (
            <ProjectHeader
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            selectedProject={selectedProject}
            showDoneBtn={showDoneBtn}
            create={handleCreateTask}
            closeModal={closeModal}
            selectedId={selectedTaskId}
            rename={handleUpdateTask}
          />   
          ) : (
            <ProjectHeader
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            selectedProject={selectedProject}
            showDoneBtn={showDoneBtn}
            create={handleCreateProject}
            closeModal={closeModal}
            selectedId={projectInEditModeId}
            rename={handleUpdateProject}
          />
          )
          }

          {selectedProjectId ? (
            <Tasks
              selectedProject={selectedProject}
              handleCheckboxClick={handleCheckboxClick}
              showInput={showInput}
              refCancel={refCancel}
              createTaskEnterKey={createTaskEnterKey}
              handleAddTask={handleAddTask}
              showCompletedTasks={showCompletedTasks}
              setShowCompletedTasks={setShowCompletedTasks}
              handleRenameTask={handleRenameTask}
              selectedTaskId={selectedTaskId}
              renameTaskEnterKey={renameTaskEnterKey}
              taskEditTitle={taskEditTitle}
              taskTitle={taskTitle}
              refTask={refTask}
              startTimer={startTimer}
            />
          ) : (
            <Projects
              projects={projects}
              projectInEditModeId={projectInEditModeId}
              projectTitle={projectTitle}
              showModalMenuListId={showModalMenuListId}
              setShowModalMenuListId={setShowModalMenuListId}
              setSelectedProjectId={setSelectedProjectId}
              selectedProjectId={selectedProjectId}
              createProjectEnterKey={createProjectEnterKey}
              handleEnterKeyRenameProject={handleEnterKeyRenameProject}
              handleAddProject={handleAddProject}
              showInput={showInput}
              refProjectCancel={refProjectCancel}
              refProject={refProject}
              projectEditTitle={projectEditTitle}
            />
          )}
        </ToDoListModalContainer>
      </ModalContainer>
    </settingsContext.Provider>
  );
}

export default ToDoListModal;


