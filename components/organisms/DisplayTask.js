import React from "react";
import { ProjectsTasksList, ListTextArrow, Wrapper, Checkbox, ProjectListText, PlayTimerButton } from "./Tasks";

function DisplayTask({
  task,
  handleCheckboxClick,
  handleRenameTask,
  startTimer,
}) {
  return (
    <ProjectsTasksList key={task.id}>
      <ListTextArrow>
        <Wrapper>
          <Checkbox
            checked={task.completed}
            onClick={() => handleCheckboxClick(task.id, task.completed)}
          />
          <ProjectListText
            onClick={() => handleRenameTask(task.id, task.title)}
          >
            {task.title}
          </ProjectListText>
        </Wrapper>
        <PlayTimerButton onClick={startTimer}>
          <img src="./assets/play-timer.svg" alt="Play" />
        </PlayTimerButton>
      </ListTextArrow>
    </ProjectsTasksList>
  );
}

export default DisplayTask;
