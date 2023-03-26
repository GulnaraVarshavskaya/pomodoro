import React from "react";
import EditTask from "./EditTask";
import DisplayTask from "./DisplayTask";

function Task({
  selectedTaskId,
  renameTaskEnterKey,
  refTask,
  taskEditTitle,
  task,
  startTimer,
  handleRenameTask,
  handleCheckboxClick
}) {
  if (selectedTaskId === task.id) {
    return (
      <EditTask 
        refTask={refTask}
        taskEditTitle={taskEditTitle}
        renameTaskEnterKey={renameTaskEnterKey}
      />
    );
  } else {
    return (
      <DisplayTask 
        task={task}
        handleCheckboxClick={handleCheckboxClick}
        handleRenameTask={handleRenameTask}
        startTimer={startTimer}
      />
    );
  }
}

export default Task;


