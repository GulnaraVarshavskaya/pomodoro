import React from 'react'
import { ProjectInput, ProjectsTasksList, ProjectVerticalDots } from './Projects';



function EditProject({
    refProject,
    projectEditTitle,
    handleEnterKeyRenameProject,
  }) {
    return (
      <ProjectsTasksList ref={refProject}>
        <ProjectVerticalDots>
          <img src="./assets/more-vertical.svg" alt="More" />
        </ProjectVerticalDots>
        <ProjectInput
          maxLength="100"
          autoFocus
          value={projectEditTitle}
          onChange={handleEnterKeyRenameProject}
          onKeyDown={handleEnterKeyRenameProject}
        />
      </ProjectsTasksList>
    );
  }

export default EditProject