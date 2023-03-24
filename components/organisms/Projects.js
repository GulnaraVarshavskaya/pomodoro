import PlusButton from "../molecules/PlusButton";
import ModalMenuList from "./ModalMenuList";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Project from "./Project";

const ToDoListModalBody = styled.div`
  padding: 0 24px 50px;
  @media only screen and (min-width: 768px) {
    padding: 0 40px 50px;
  } ;
`;

const ProjectsTasksUl = styled.div`
  padding-left: 0;
  overflow: scroll;
  height: 380px;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  &::-webkit-scrollbar {
    // Chrome, Safari and Opera
    display: none;
  }
  @media only screen and (min-width: 768px) {
    height: 255px;
  } ;
`;

export const ProjectsTasksList = styled.div`
  display: flex;
  align-items: center;
  padding: 13px 0;
  border-bottom: 1px solid rgba(227, 225, 225, 0.7);
`;

export const ProjectVerticalDots = styled.button`
  display: grid;
  align-items: center;
  background: none;
  cursor: pointer;
  border: none;
  padding: 0;
  margin: 0;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  &:focus {
    outline: 0;
  }
`;

export const ListTextArrow = styled.div`
  display: flex;
  align-items: center;
  flex: 1 auto;
  justify-content: space-between;
`;

export const ProjectListText = styled.span`
  font-size: 12px;
  font-weight: 500px;
  font-family: "Kumbh Sans";
  line-height: 18px;
  vertical-align: middle;
  align-items: center;
  color: rgba(22, 25, 50, 1);
  margin-left: 8px;
  cursor: pointer;
  width: 210px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (min-width: 768px) {
    font-size: 14px;
    margin-left: 10px;
    width: 380px;
  } ;
`;

export const ProjectInput = styled.input`
  display: block;
  width: 210px;
  padding: 0;
  margin-left: 8px;
  border: none;
  &:focus {
    outline: 0;
  }
  color: rgba(22, 25, 50, 1);
  font-size: 12px;
  font-family: "Kumbh Sans";
  font-weight: 500;
  line-height: 18px;
  @media only screen and (min-width: 768px) {
    font-size: 14px;
    margin-left: 10px;
    width: 380px;
  } ;
`;

export const ForwardArrowSvg = styled.button`
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

function Projects({
  updateStates,
  projects,
  projectInEditModeId,
  projectTitle,
  showModalMenuListId,
  refProject,
  showInput,
  projectEditTitle,
  handleUpdateProject,
  handleCreateProject,
}) {
  function handleAddProject() {
    updateStates({
      showInput: true, showDoneBtn: true, projectTitle: "",
    })
  }
  function handleEnterKeyRenameProject(e) {
    // when user press Enter this function will be executed
    if (e.key === "Enter") {
      handleUpdateProject();
    }   
    else {
      //when users don't press Enter they can continue typing in the input
      updateStates({projectEditTitle: e.target.value})
    }
  }
  function createProjectEnterKey(e) {
    if (e.key === "Enter") {
      handleCreateProject();
    } 
    else {
      updateStates({projectTitle: e.target.value})
    }
  }

  const handleClickOutsideProjectsCancelCreate = (event) => {
    const isTargetNotDoneBtn = event.target.innerText !== "Done";
    if (isTargetNotDoneBtn) {
    updateStates({
      showModalMenuListId: null,
      showInput: false,
      showDoneBtn: false,
    })
    }
  };

  const refProjectCancel = useOutsideClick(
    handleClickOutsideProjectsCancelCreate,
    [showInput]
  );
  

  return (
    <ToDoListModalBody>
      {projects.length > 0 && (
        <ProjectsTasksUl>
          {projects.map((project) => {
            return <Project 
            updateStates = {updateStates}
            projectInEditModeId = {projectInEditModeId}
            refProject = {refProject}
            projectEditTitle = {projectEditTitle}
            showModalMenuListId = {showModalMenuListId}
            handleEnterKeyRenameProject = {handleEnterKeyRenameProject}
            project = {project}
            />
            // if (projectInEditModeId === project.id) {
            //   return (
            //     <>
            //       <ProjectsTasksList ref={refProject}>
            //         <ProjectVerticalDots>
            //           <img src="./assets/more-vertical.svg" alt="More" />
            //         </ProjectVerticalDots>
            //         <ProjectInput
            //           maxLength="100"
            //           autoFocus
            //           value={projectEditTitle}
            //           onChange={handleEnterKeyRenameProject}
            //           onKeyDown={handleEnterKeyRenameProject}
            //         />
            //       </ProjectsTasksList>
            //     </>
            //   );
            // } else if (showModalMenuListId === project.id) {
            //   return (
            //     <ProjectsTasksList key={project.id}>
            //       {" "}
            //       <ProjectVerticalDots
            //         // onClick={() => setShowModalMenuListId(project.id)}
            //         onClick={() => updateStates({showModalMenuListId: project.id})}
            //       >
            //         <img src="./assets/more-vertical.svg" alt="More" />
            //       </ProjectVerticalDots>
            //       {<ModalMenuList showModalMenuListId={showModalMenuListId} />}
            //       <ListTextArrow>
            //         <ProjectListText>{project.title}</ProjectListText>
            //         <ForwardArrowSvg
            //           onClick={() => updateStates({selectedProjectId: project.id})}
            //         >
            //           <img src="./assets/icon-arrow-right.svg" alt="Forward" />
            //         </ForwardArrowSvg>
            //       </ListTextArrow>
            //     </ProjectsTasksList>
            //   );
            // } else {
            //   return (
            //     <ProjectsTasksList key={project.id}>
            //       {" "}
            //       <ProjectVerticalDots
            //         onClick={() => updateStates({showModalMenuListId: project.id})}
            //       >
            //         <img src="./assets/more-vertical.svg" alt="More" />
            //       </ProjectVerticalDots>
            //       <ListTextArrow>
            //         <ProjectListText>{project.title}</ProjectListText>
            //         <ForwardArrowSvg
            //           onClick={() => updateStates({selectedProjectId: project.id})}
            //         >
            //           <img src="./assets/icon-arrow-right.svg" alt="Forward" />
            //         </ForwardArrowSvg>
            //       </ListTextArrow>
            //     </ProjectsTasksList>
            //   );
            // }
          })}

          {showInput ? (
            <ProjectsTasksList ref={refProjectCancel}>
              <ProjectVerticalDots>
                <img src="./assets/more-vertical.svg" alt="More" />
              </ProjectVerticalDots>
              <ProjectInput
                maxLength="100"
                autoFocus
                value={projectTitle}
                onChange={createProjectEnterKey}
                onKeyDown={createProjectEnterKey}
              />
            </ProjectsTasksList>
          ) : (
            false
          )}
        </ProjectsTasksUl>
      )}
      <PlusButton onClick={() => handleAddProject()}>Add a project</PlusButton>
    </ToDoListModalBody>
  );
}

export default Projects;
