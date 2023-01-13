import Heading from '../atoms/Heading'
import PlusButton from '../atoms/PlusButton'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { settingsContext } from '../../pages'
import tasks from '../../prisma/seed/data/tasks'


const ModalContainer = styled.div`
    display: flex;
    align-items: center;
`


const ToDoListModalContainer = styled.div`
    position: fixed;
    inset: calc((100vh - 580px)/2) calc((100vw - 328px)/2);
    border-radius: 25px;
    background-color: white;
    z-index: 100;
    @media only screen and (min-width: 768px){
        inset: calc((100vh - 464px)/2) calc((100vw - 540px)/2);
    };
`

const ToDoListModalHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(227, 225, 225, 1);
    padding: 24px 24px 28px;
    @media only screen and (min-width: 768px){
        padding: 33px 40px;
    };
`
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

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
`


const ToDoListModalBody = styled.div`
    padding: 0 24px 50px;
    @media only screen and (min-width: 768px){
        padding: 0 40px 50px;
    };
`

const ProjectsTasksUl = styled.div`
    padding-left: 0;
`

const ProjectsTasksList = styled.div`
    display: flex;
    align-items: center;
    padding: 18px 10px;
    border-bottom: 1px solid rgba(227, 225, 225, .7);
`

const ProjectListDot = styled.svg`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(248, 112, 112, 1);
`

const ListTextArrow = styled.div`
    display: flex;
    align-items: center;
    flex: 1 auto;
    justify-content: space-between; 
`

const ProjectListText = styled.span`
    font-size: 14px;
    font-weight: 500px;
    line-height: 18px;
    vertical-align: middle;
    align-items: center;
    color: rgba(22, 25, 50, 1);
    margin-left: 12px;
    cursor: pointer;
`

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
`
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
`

const Checkbox = styled.input.attrs({ type: "checkbox" })`
    -webkit-appearance: none; 
    -moz-appearance: none;
    /* position: absolute; */
    width: 18px;
    height: 18px;
    border: 1px solid #F87070;
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
    background-color: #F87070;
    background-image: url(./assets/check.svg);
    background-repeat: no-repeat;
    background-position: center;
}
`

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
`



function ToDoListModal() {

    const { showModal, closeModal } = useContext(settingsContext)

    const [ projects, setProjects ] = useState([])
    const [ selectedProjectId, setSelectedProjectId ] = useState(null)

    async function fetchProjects() {
        // console.log("Fetching...")
        const response = await fetch (`api/projects`);
        // console.log("response",response)
        const data = await response.json();
        // console.log("data",data)
        setProjects(data.projects);
    }

    useEffect( () => {
        fetchProjects();
    }, [])

    async function handleCheckboxClick(id, completed) {
        console.log("id", id, "completed", completed)
        const response = await fetch (`api/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                completed: !completed,
            }),
        })
        const data = await response.json()

        console.log("data", data)
        const updatedProjects = projects.map( (project) => {
            if ( project.id === selectedProjectId) {
                console.log("project", project)
                const updatedTasks = project.tasks.map( (task) => {
                    if (task.id === data.id) {
                       return {
                        id: task.id,
                        title: task.title,
                        projectId: task.projectId,
                        completed: data.completed
                    } 
                    }
                    else {return task}
                    
                })
                project.tasks = updatedTasks
            }
            return project
        })
        console.log("updatedProjects", updatedProjects)
        setProjects(updatedProjects)
    }

    // console.log("projects", projects)

    const selectedProject = projects.find( (project) => {
        return project.id === selectedProjectId
    })

  return (
    <ModalContainer showModal={showModal}>
    <ToDoListModalContainer>
        <ToDoListModalHeader>
            <Wrapper>
        {selectedProjectId !== null && <BackArrowSvg onClick={() => setSelectedProjectId(null)}><img src="./assets/icon-arrow-left.svg" alt="Back" /></BackArrowSvg>}
            <Heading
            size="headingM"
            color="dark"
            >
                {selectedProjectId !== null && selectedProject.title}
                {selectedProjectId === null && "Projects"}
            </Heading>
            </Wrapper>
            <CloseButton onClick={closeModal}>
                <img src="./assets/icon-close.svg" alt="Close modal" />
            </CloseButton>
        </ToDoListModalHeader>
        { selectedProjectId === null && <ToDoListModalBody
        >
            {projects.length > 0 && (

            <ProjectsTasksUl>
                {projects.map( project => {
                    // console.log("project", project)                    
                    return (
                    <ProjectsTasksList
                    key={project.id}
                    >
                        <ProjectListDot />
                        <ListTextArrow>
                            <ProjectListText>{project.title}</ProjectListText>
                            <ForwardArrowSvg
                             onClick={() => setSelectedProjectId(project.id)}
                            >
                                <img src="./assets/icon-arrow-right.svg" alt="Forward" />
                            </ForwardArrowSvg>                            
                        </ListTextArrow>
                    </ProjectsTasksList>)})}
            </ProjectsTasksUl>)}
            <PlusButton>Add a project</PlusButton>
        </ToDoListModalBody>}

        {selectedProjectId !== null && <ToDoListModalBody>
            {selectedProject.tasks.length > 0 && (
                <ProjectsTasksUl>
                    {selectedProject.tasks.map( task => {
                        // console.log("task", task)                    
                        return (
                        <ProjectsTasksList
                        key={task.id}
                        >
                            <ListTextArrow>
                                <Wrapper>
                                    <Checkbox 
                                    checked={task.completed}
                                    onClick={() => handleCheckboxClick(task.id, task.completed)}
                                    />
                                    <ProjectListText>{task.title}</ProjectListText>
                                </Wrapper>
                                <PlayTimerButton
                                >
                                    <img src="./assets/play-timer.svg" alt="Play" />
                                </PlayTimerButton>                            
                            </ListTextArrow>
                        </ProjectsTasksList>)})}
                </ProjectsTasksUl>)}
                <PlusButton>Add a task</PlusButton>
            </ToDoListModalBody>}
    </ToDoListModalContainer>
    </ModalContainer>
  )
}

export default ToDoListModal