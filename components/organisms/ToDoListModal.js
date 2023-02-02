import Heading from "../atoms/Heading";
import PlusButton from "../molecules/PlusButton";
import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { settingsContext } from "../../pages";
import tasks from "../../prisma/seed/data/tasks";
import { v4 as uuid } from "uuid";

const colorBg = {
  red: "rgba(248, 112, 112, 1)",
  grey: "rgba(239, 241, 250, 1)",
};

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

const ToDoListModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(227, 225, 225, 1);
  padding: 24px 24px 28px;
  @media only screen and (min-width: 768px) {
    padding: 33px 40px;
  } ;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  &:focus {
    outline: 0;
  }
`;

const ToDoListModalBody = styled.div`
  padding: 0 24px 50px;
  @media only screen and (min-width: 768px) {
    padding: 0 40px 50px;
  } ;
`;

const ProjectsTasksUl = styled.div`
  padding-left: 0;
  overflow: scroll;
  height: 255px;
`;

const ProjectsTasksList = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 10px;
  border-bottom: 1px solid rgba(227, 225, 225, 0.7);
`;

const ProjectListDot = styled.svg`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => colorBg[props.backgroundColor]};
`;

const ListTextArrow = styled.div`
  display: flex;
  align-items: center;
  flex: 1 auto;
  justify-content: space-between;
`;

const ProjectListText = styled.span`
  font-size: 14px;
  font-weight: 500px;
  line-height: 18px;
  vertical-align: middle;
  align-items: center;
  color: rgba(22, 25, 50, 1);
  margin-left: 12px;
  cursor: pointer;
`;

const ProjectInput = styled.input`
  display: block;
  width: 378px;
  padding: 0;
  margin-left: 12px;
  border: none;
  &:focus {
    outline: 0;
  }
  color: rgba(22, 25, 50, 1);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`;

const ForwardArrowSvg = styled.button`
  display: grid;
  align-items: center;
  padding: 0px;
  background: none;
  cursor: pointer;
  border: none;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  &:focus {
    outline: 0;
  }
`;
const BackArrowSvg = styled.button`
  display: grid;
  align-items: center;
  padding: 0;
  margin-right: 12px;
  background: none;
  cursor: pointer;
  border: none;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  &:focus {
    outline: 0;
  }
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  -webkit-appearance: none;
  -moz-appearance: none;
  /* position: absolute; */
  width: 18px;
  height: 18px;
  border: 1px solid #f87070;
  border-radius: 50%;
  margin: 0;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:checked {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #f87070;
    background-image: url(./assets/check.svg);
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const PlayTimerButton = styled.button`
  display: grid;
  align-items: center;
  padding: 0px;
  background: none;
  cursor: pointer;
  opacity: 1;
  border: none;
  &:hover {
    opacity: 0.7;
  }
  &:focus {
    outline: 0;
  }
`;

function ToDoListModal() {
  const { showModal, closeModal } = useContext(settingsContext);

  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [projectInEditModeId, setProjectInEditModeId] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");

  const [taskTitle, setTaskTitle] = useState("");

  const [showInput, setShowInput] = useState(false);

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
      console.log("projectInEditModeId", projectInEditModeId);

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
    // console.log("callback", callback)
    const ref = useRef();
    // console.log("ref", ref)

    useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
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
    setShowInput(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  function updateTaskTitle(e) {
    setTaskTitle(e.target.value);
  }

  async function handleTaskChanges(e, completed) {
    if (e.key === "Enter") {
      const newTask = {
        id: uuid(),
        title: taskTitle,
        projectId: selectedProjectId,
        completed: false,
      };
      console.log("newTask", newTask);
      const updatedProjects = projects.map((project) => {
        if (project.id === selectedProjectId) {
          console.log("project", project);
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

      const response = await fetch(
        `/api/projects/${selectedProjectId}/tasks/`,
        {
          method: "POST",
          body: JSON.stringify({
            id: newTask.id,
            projectId: selectedProjectId,
            title: taskTitle,
            completed: false
          }),
        }
      );
      const data = await response.json();
      console.log("updatedProjects", updatedProjects);
    }
  }

  async function handleAddTask() {
    console.log("let's start");
    setShowInput(true);
    console.log("selselectedProjectId", selectedProjectId);
  }

  return (
    <ModalContainer showModal={showModal}>
      <ToDoListModalContainer>
        <ToDoListModalHeader>
          <Wrapper>
            {selectedProjectId !== null && (
              <BackArrowSvg onClick={() => setSelectedProjectId(null)}>
                <img src="./assets/icon-arrow-left.svg" alt="Back" />
              </BackArrowSvg>
            )}
            <Heading size="headingM" color="dark">
              {selectedProjectId !== null && selectedProject.title}
              {selectedProjectId === null && "Projects"}
            </Heading>
          </Wrapper>
          <CloseButton onClick={closeModal}>
            <img src="./assets/icon-close.svg" alt="Close modal" />
          </CloseButton>
        </ToDoListModalHeader>
        {selectedProjectId === null && (
          <ToDoListModalBody>
            {projects.length > 0 && (
              <ProjectsTasksUl>
                {projects.map((project) => {
                  if (projectInEditModeId === project.id) {
                    return (
                      <>
                        <ProjectsTasksList>
                          <ProjectListDot backgroundColor="grey" />
                          <ProjectInput
                            // maxLength="60"
                            autoFocus
                            value={projectTitle}
                            onChange={handleChanges}
                            onKeyDown={handleChanges}
                          />
                        </ProjectsTasksList>
                      </>
                    );
                  } else {
                    return (
                      <ProjectsTasksList key={project.id}>
                        {" "}
                        <ProjectListDot backgroundColor="red" />
                        <ListTextArrow>
                          <ProjectListText>{project.title}</ProjectListText>
                          <ForwardArrowSvg
                            onClick={() => setSelectedProjectId(project.id)}
                          >
                            <img
                              src="./assets/icon-arrow-right.svg"
                              alt="Forward"
                            />
                          </ForwardArrowSvg>
                        </ListTextArrow>
                      </ProjectsTasksList>
                    );
                  }
                })}
              </ProjectsTasksUl>
            )}
            <PlusButton onClick={() => handleAddProject()}>
              Add a project
            </PlusButton>
          </ToDoListModalBody>
        )}

        {selectedProjectId !== null && (
          <ToDoListModalBody>
              <ProjectsTasksUl>
                {selectedProject.tasks.map((task) => {
                  return (
                    <ProjectsTasksList key={task.id}>
                      <ListTextArrow>
                        <Wrapper>
                          <Checkbox
                            checked={task.completed}
                            onClick={() =>
                              handleCheckboxClick(task.id, task.completed)
                            }
                          />
                          <ProjectListText>{task.title}</ProjectListText>
                        </Wrapper>
                        <PlayTimerButton>
                          <img src="./assets/play-timer.svg" alt="Play" />
                        </PlayTimerButton>
                      </ListTextArrow>
                    </ProjectsTasksList>
                  );
                })}

                {showInput ? (
                  <ProjectsTasksList ref={ref}>
                    <ListTextArrow>
                      <Wrapper>
                        <Checkbox disabled={true} />
                        <ProjectInput
                          autoFocus
                          // onBlur={handleClickOutside}
                          onChange={updateTaskTitle}
                          onKeyDown={handleTaskChanges}
                        />
                      </Wrapper>
                    </ListTextArrow>
                  </ProjectsTasksList>
                ) : (
                  false
                )}
              </ProjectsTasksUl>
  
            <PlusButton onClick={handleAddTask}>Add a task</PlusButton>
          </ToDoListModalBody>
        )}
      </ToDoListModalContainer>
    </ModalContainer>
  );
}

export default ToDoListModal;
