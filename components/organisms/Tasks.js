
import PlusButton from "../molecules/PlusButton";
import styled from "styled-components";


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  padding: 13px 10px 13px 5px;
  border-bottom: 1px solid rgba(227, 225, 225, 0.7);
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

function Tasks({
    selectedProject,
    handleCheckboxClick,
    showInput,
    ref,
    updateTaskTitle,
    handleEnterKey,
    handleAddTask,
  }) {
    return (
      <ToDoListModalBody>
        <ProjectsTasksUl>
          {selectedProject.tasks.map((task) => {
            return (
              <ProjectsTasksList key={task.id}>
                <ListTextArrow>
                  <Wrapper>
                    <Checkbox
                      checked={task.completed}
                      onClick={() => handleCheckboxClick(task.id, task.completed)}
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
                    onKeyDown={handleEnterKey}
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
    );
  }

  export default Tasks;
  