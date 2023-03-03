import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { settingsContext } from "../../pages";
import { v4 as uuid } from "uuid";
import ProjectHeader from "./ProjectHeader";
import Projects from "./Projects";
import Tasks from "./Tasks";
import { xml2json } from "json_xml";

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

  // console.log("showCompletedTasks", showCompletedTasks)

  async function fetchProjects() {
    const response = await fetch(`api/projects`);

    const data = await response.json();

    setProjects(data.projects);
  }

  useEffect(() => {
    const closeModal = (e) => {
      console.log("showInput",showInput)
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

  useEffect(() => {
    fetchProjects();
  }, []);

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

    // we're sending a PATCH request to update task with a specific id
    // we're sending in the body an object with key completed and the value of completed id not completed
    // optimistic update
    const response = await fetch(`api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !completed,
      }),
    });
    // here we get data from the server. It's an object with id and completed
    // id - id of task, completed - updated value
    const data = await response.json();
  }

  const selectedProject = projects.find((project) => {
    return project.id === selectedProjectId;
  });

  function handleAddProject() {
    setShowInput(true);
    setShowDoneBtn(true);
    setProjectTitle("");
  }

  function createProjectEnterKey(e) {
    if (e.key === "Enter") {
      createProject();
    } 
    else {
      setProjectTitle(e.target.value);
    }
  }

  async function createProject() {
    const newProject = {
      id: uuid(),
      title: projectTitle,
    };
    const updatedProjects = [...projects, newProject];

    setProjects(updatedProjects);
    setShowInput(false);
    setShowDoneBtn(false);

    const response = await fetch(`api/projects`, {
      method: "POST",
      body: JSON.stringify({
        id: newProject.id,
        title: projectTitle,
      }),
    });
    const data = await response.json();
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
      renameProject();
    }   
    else {
      //when users don't press Enter they can continue typing in the input
      setProjectEditTitle(e.target.value);
    }
  }

  const renameProject = async () => {
    console.log(
      "projectInEditModeId",
      projectInEditModeId,
      "projectTitle",
      projectTitle
    );
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

    // we're sending a PATCH request to update project with a specific id
    // we're sending in the body an object with key title and the value of new title
    const response = await fetch(`api/projects/${projectInEditModeId}`, {
      method: "PATCH",
      body: JSON.stringify({
        id: projectInEditModeId,
        title: projectEditTitle,
      }),
    });

    // here we get data from the server. It's an object with id and title
    // id - id of project, title - updated value
    const data = await response.json();
  };

  async function handleDeleteProject(projectId) {
    const deletedProject = projects.filter((project) => {
      return project.id !== projectId;
    });
    setProjects(deletedProject);

    const response = await fetch(`api/projects/${projectId}`, {
      method: "DELETE",
      body: JSON.stringify({
        id: projectId,
      }),
    });
    const data = await response.json();
  }


  const useOutsideClick = (callback, dependencies) => {
    const ref = useRef();

    useEffect(() => {
      const handleClick = (event) => {
        const isRefBeingUsed = Boolean(ref.current);
        const isClickOutsideInput = !ref.current?.contains(event.target);
        const isTargetNotDoneBtn = event.target.innerText !== "Done";
        if (isRefBeingUsed && isClickOutsideInput && isTargetNotDoneBtn) {
          callback();
        }
      };

      document.addEventListener("click", handleClick, true);

      return () => {
        document.removeEventListener("click", handleClick, true);
      };
    }, [ref, ...dependencies]);

    return ref;
  };

  const handleClickOutsideTasksCancelCreate = () => {
    console.log("hello there");
    // setShowModalMenuListId(null);
    setShowInput(false);
    setShowDoneBtn(false);
  };

  const handleClickOutsideTasks = () => {
    renameTask();
  };

  const refTask = useOutsideClick(handleClickOutsideTasks, [selectedTaskId]);

  const refCancel = useOutsideClick(handleClickOutsideTasksCancelCreate, [
    showInput,
  ]);

  const handleClickOutsideProjects = () => {
    handleRenameProject(null);
  };

  const handleClickOutsideProjectsCancelCreate = () => {
    setShowModalMenuListId(null);
    setShowInput(false);
    setShowDoneBtn(false);
  };

  const refProject = useOutsideClick(handleClickOutsideProjects, [
    selectedProjectId,
  ]);

  const refProjectCancel = useOutsideClick(
    handleClickOutsideProjectsCancelCreate,
    [showInput]
  );

  function handleAddTask() {
    setShowInput(true);
    setShowDoneBtn(true);
    setTaskTitle("");
  }

  function createTaskEnterKey(e) {
    if (e.key === "Enter") {
      createTask();
    } 
    else {
      setTaskTitle(e.target.value);
    }
  }

  async function createTask() {
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

    const response = await fetch(`/api/projects/${selectedProjectId}/tasks/`, {
      method: "POST",
      body: JSON.stringify({
        id: newTask.id,
        projectId: selectedProjectId,
        title: taskTitle,
        completed: false,
      }),
    }); 
    const data = await response.json();
  }

  function handleRenameTask(id, title) {
    console.log("selectedId:" + id);
    setSelectedTaskId(id);
    setTaskEditTitle(title);
    setShowDoneBtn(true);
  }

  function renameTaskEnterKey(e) {
    if (e.key === "Enter") {
      renameTask();
    } 
    else {
      setTaskEditTitle(e.target.value);
    }
  }

  async function renameTask() {
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
    console.log("taskEditTitle", taskEditTitle);
    setProjects(updatedProjects);
    setShowDoneBtn(false);
    setSelectedTaskId(null);

    const response = await fetch(`api/tasks/${selectedTaskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        id: selectedTaskId,
        title: taskEditTitle,
      }),
    });
    const data = await response.json();
  }

  const startTimer = () => {
    console.log("Hi");
    closeModal();
    // toggleAction();
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
            create={createTask}
            closeModal={closeModal}
            selectedId={selectedTaskId}
            rename={renameTask}
          />   
          ) : (
            <ProjectHeader
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            selectedProject={selectedProject}
            showDoneBtn={showDoneBtn}
            create={createProject}
            closeModal={closeModal}
            selectedId={projectInEditModeId}
            rename={renameProject}
            // createProject={createProject}
            // renameProject={renameProject}
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
