import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { settingsContext } from "../../pages";
import tasks from "../../prisma/seed/data/tasks";
import { v4 as uuid } from "uuid";
import ProjectHeader from "./ProjectHeader";
import Projects from "./Projects";
import Tasks from "./Tasks";


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
  const { showModal, closeModal } = useContext(settingsContext);

  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [projectInEditModeId, setProjectInEditModeId] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");

  const [taskTitle, setTaskTitle] = useState("");

  const [showInput, setShowInput] = useState(false);
  const [showDoneBtn, setShowDoneBtn] = useState(false);
  const [showModalMenuListId, setShowModalMenuListId] = useState(null);

  async function fetchProjects() {
    const response = await fetch(`api/projects`);

    const data = await response.json();

    setProjects(data.projects);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function handleCheckboxClick(id, completed) {
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

  async function handleAddProject() {
    const response = await fetch(`api/projects`, {
      method: "POST",
    });
    const data = await response.json();

    const updatedProjects = [...projects, data.newProject];

    const newProjectId = data.newProject.id;

    setProjects(updatedProjects);
    setProjectInEditModeId(newProjectId);
    setProjectTitle("");
  }

  const handleChanges = async (e) => {
    // when user press Enter this function will be executed
    if (e.key === "Enter") {
      // we mapping the array of projects and return new array of updated project
      const updatedProjects = projects.map((project) => {
        // if the id of the project we are mapping over matches with the project id in edit mode
        if (project.id === projectInEditModeId) {
          // return an object. id, included tasks stay the same, title is going to change
          return {
            // id: project.id,
            // tasks: project.tasks,
            ...project,
            title: projectTitle,
          };
        }
        // if the project wasn't updated just return it in a new array
        return project;
      });

      // we're calling the setter and triggering rerender (update state)
      setProjects(updatedProjects);
      // by setting this state to null, all projects are displayed normally (no input field anywhere). Close the input
      setProjectInEditModeId(null);

      // we're sending a PATCH request to update project with a specific id
      // we're sending in the body an object with key title and the value of new title
      const response = await fetch(`api/projects/${projectInEditModeId}`, {
        method: "PATCH",
        body: JSON.stringify({
          id: projectInEditModeId,
          title: projectTitle,
        }),
      });

      // here we get data from the server. It's an object with id and title
      // id - id of project, title - updated value
      const data = await response.json();
    } else {
      //when users don't press Enter they can continue typing in the input
      setProjectTitle(e.target.value);
    }
  };

  const useOutsideClick = (callback) => {
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
    }, [ref]);

    return ref;
  };

  const handleClickOutside = () => {
    setShowModalMenuListId(null);
    setShowInput(false);
    setShowDoneBtn(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  function updateTaskTitle(e) {
    setTaskTitle(e.target.value);
  }

  async function handleEnterKey(e) {
    if (e.key === "Enter") {
      createTask();
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
    setTaskTitle("");
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

  async function handleAddTask() {
    setShowInput(true);
    setShowDoneBtn(true);
  }

  async function handleDeleteProject() {
    const deletedProject = projects.filter((project) => {
      return project.id !== showModalMenuListId;
    });
    setProjects(deletedProject);

    const response = await fetch(`api/projects/${showModalMenuListId}`, {
      method: "DELETE",
      body: JSON.stringify({
        id: showModalMenuListId,
      }),
    });
    const data = await response.json();
  }

  async function handleRenameProject() {
    const currentTitle = projects
      .filter((project) => {
        return project.id === showModalMenuListId;
      })
      .map((project) => {
        return project.title;
      });

    setProjectInEditModeId(showModalMenuListId);
    setProjectTitle(currentTitle);
    setShowModalMenuListId(null);
  }

  return (
    <settingsContext.Provider
      value={{
        showModalMenuListId,
        ref,
        handleDeleteProject,
        handleRenameProject,
      }}
    >
      <ModalContainer showModal={showModal}>
        <ToDoListModalContainer>
          <ProjectHeader
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            selectedProject={selectedProject}
            showDoneBtn={showDoneBtn}
            createTask={createTask}
            closeModal={closeModal}
          />
          {selectedProjectId ? (
            <Tasks
              selectedProject={selectedProject}
              handleCheckboxClick={handleCheckboxClick}
              showInput={showInput}
              ref={ref}
              updateTaskTitle={updateTaskTitle}
              handleEnterKey={handleEnterKey}
              handleAddTask={handleAddTask}
            />
          ) : (
            <Projects
              projects={projects}
              projectInEditModeId={projectInEditModeId}
              projectTitle={projectTitle}
              handleChanges={handleChanges}
              showModalMenuListId={showModalMenuListId}
              setShowModalMenuListId={setShowModalMenuListId}
              setSelectedProjectId={setSelectedProjectId}
              handleAddProject={handleAddProject}
            />
          )}
        </ToDoListModalContainer>
      </ModalContainer>
    </settingsContext.Provider>
  );
}

export default ToDoListModal;
