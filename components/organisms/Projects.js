import PlusButton from "../molecules/PlusButton";
import ModalMenuList from "./ModalMenuList";
import styled from "styled-components";

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
  padding: 13px 10px 13px 5px;
  border-bottom: 1px solid rgba(227, 225, 225, 0.7);
`;

const ProjectVerticalDots = styled.button`
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

const ListTextArrow = styled.div`
  display: flex;
  align-items: center;
  flex: 1 auto;
  justify-content: space-between;
`;

const ProjectListText = styled.span`
  font-size: 14px;
  font-weight: 500px;
  font-family: "Kumbh Sans";
  line-height: 18px;
  vertical-align: middle;
  align-items: center;
  color: rgba(22, 25, 50, 1);
  margin-left: 10px;
  cursor: pointer;
`;

const ProjectInput = styled.input`
  display: block;
  padding: 0;
  margin-left: 12px;
  border: none;
  &:focus {
    outline: 0;
  }
  color: rgba(22, 25, 50, 1);
  font-size: 14px;
  font-family: "Kumbh Sans";
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

function Projects({
  projects,
  projectInEditModeId,
  projectTitle,
  handleChanges,
  showModalMenuListId,
  setShowModalMenuListId,
  setSelectedProjectId,
  handleAddProject,
}) {
  return (
    <ToDoListModalBody>
      {projects.length > 0 && (
        <ProjectsTasksUl>
          {projects.map((project) => {
            if (projectInEditModeId === project.id) {
              return (
                <>
                  <ProjectsTasksList>
                    {/* <ProjectListDot backgroundColor="grey" /> */}
                    <ProjectVerticalDots>
                      <img src="./assets/more-vertical.svg" alt="More" />
                    </ProjectVerticalDots>
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
            } else if (showModalMenuListId === project.id) {
              return (
                <ProjectsTasksList key={project.id}>
                  {" "}
                  <ProjectVerticalDots
                    onClick={() => setShowModalMenuListId(project.id)}
                  >
                    <img src="./assets/more-vertical.svg" alt="More" />
                  </ProjectVerticalDots>
                  {<ModalMenuList showModalMenuListId={showModalMenuListId} />}
                  <ListTextArrow>
                    <ProjectListText>{project.title}</ProjectListText>
                    <ForwardArrowSvg
                      onClick={() => setSelectedProjectId(project.id)}
                    >
                      <img src="./assets/icon-arrow-right.svg" alt="Forward" />
                    </ForwardArrowSvg>
                  </ListTextArrow>
                </ProjectsTasksList>
              );
            } else {
              return (
                <ProjectsTasksList key={project.id}>
                  {" "}
                  {/* <ProjectListDot backgroundColor="red" /> */}
                  <ProjectVerticalDots
                    onClick={() => setShowModalMenuListId(project.id)}
                  >
                    <img src="./assets/more-vertical.svg" alt="More" />
                  </ProjectVerticalDots>
                  <ListTextArrow>
                    <ProjectListText>{project.title}</ProjectListText>
                    <ForwardArrowSvg
                      onClick={() => setSelectedProjectId(project.id)}
                    >
                      <img src="./assets/icon-arrow-right.svg" alt="Forward" />
                    </ForwardArrowSvg>
                  </ListTextArrow>
                </ProjectsTasksList>
              );
            }
          })}
        </ProjectsTasksUl>
      )}
      <PlusButton onClick={() => handleAddProject()}>Add a project</PlusButton>
    </ToDoListModalBody>
  );
}

export default Projects;
