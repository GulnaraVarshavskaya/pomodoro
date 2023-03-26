import React from "react";
import {
  ListTextArrow,
  ProjectsTasksList,
  Wrapper,
  Checkbox,
  ProjectInput,
} from "./Tasks";

function EditTask({ refTask, taskEditTitle, renameTaskEnterKey }) {
  return (
    <ProjectsTasksList ref={refTask}>
      <ListTextArrow>
        <Wrapper>
          <Checkbox disabled={true} />
          <ProjectInput
            maxLength="100"
            autoFocus
            value={taskEditTitle}
            // onBlur={handleClickOutside}
            onChange={renameTaskEnterKey}
            onKeyDown={renameTaskEnterKey}
          />
        </Wrapper>
      </ListTextArrow>
    </ProjectsTasksList>
  );
}

export default EditTask;
