import Heading from "../atoms/Heading";
import styled from "styled-components";

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

const DoneBtn = styled.button`
  padding: 0px;
  background: none;
  border: none;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

const TextDoneBtn = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
  color: #f97070;
`;

function ProjectHeader({
  projects,
  selectedProjectId,
  showDoneBtn,
  create,
  closeModal,
  selectedId,
  rename,
  updateStates
}) {

  const selectedProject = projects.find((project) => {
    return project.id === selectedProjectId;
  });

  return (
    <ToDoListModalHeader>
      <Wrapper>
        {selectedProjectId && (
          <BackArrowSvg onClick={() => updateStates({selectedProjectId: null})}>
            <img src="./assets/icon-arrow-left.svg" alt="Back" />
          </BackArrowSvg>
        )}
        <Heading size="headingM" color="dark">
          {selectedProjectId ? selectedProject.title : "Projects"}
        </Heading>
      </Wrapper>
      <>
      {showDoneBtn ? (
        <DoneBtn onClick={selectedId == null ? create : rename}>
          <TextDoneBtn>Done</TextDoneBtn>
        </DoneBtn>
      ) : (
        <CloseButton onClick={closeModal}>
          <img src="./assets/icon-close.svg" alt="Close modal" />
        </CloseButton>
      )}
      </>
    </ToDoListModalHeader>
  );
}

export default ProjectHeader;
