import React from "react";
import {
  Checkbox,
  ListTextArrow,
  PlayTimerButton,
  ProjectListText,
  ProjectsTasksList,
  Wrapper,
} from "./Tasks";

function DisplayCompletedTask({
  task,
  handleCheckboxClick,
  completedTasksCount,
  showCompletedTasks
}) {
  return (
    <ProjectsTasksList key={task.id}>
      <ListTextArrow>
        <Wrapper>
          <Checkbox
            checked={task.completed}
            onClick={() =>
              handleCheckboxClick(task.id, task.completed, completedTasksCount)
            }
          />
          <ProjectListText>{task.title}</ProjectListText>
        </Wrapper>
        <PlayTimerButton disabled={showCompletedTasks}>
          <img src="./assets/play-timer.svg" alt="Play" />
        </PlayTimerButton>
      </ListTextArrow>
    </ProjectsTasksList>
  );
}

export default DisplayCompletedTask;
