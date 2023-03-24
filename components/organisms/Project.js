import React from "react";
import ModalMenuList from "./ModalMenuList";
import {
  ForwardArrowSvg,
  ListTextArrow,
  ProjectInput,
  ProjectListText,
  ProjectsTasksList,
  ProjectVerticalDots,
} from "./Projects";

function Project({
  updateStates,
  projectInEditModeId,
  refProject,
  projectEditTitle,
  showModalMenuListId,
  handleEnterKeyRenameProject,
  project,
}) {
  if (projectInEditModeId === project.id) {
    return (
      <EditProject
        refProject={refProject}
        projectEditTitle={projectEditTitle}
        handleEnterKeyRenameProject={handleEnterKeyRenameProject}
      />
    );
  } else {
    return (
      <DisplayProject 
        project={project}
        updateStates={updateStates}
        showModalMenuListId={showModalMenuListId}
      />
    );
  }
}

export default Project;

function DisplayProject({project, updateStates, showModalMenuListId}) {
    return <ProjectsTasksList key={project.id}>
        {" "}
        <ProjectVerticalDots
            onClick={() => updateStates({ showModalMenuListId: project.id })}
        >
            <img src="./assets/more-vertical.svg" alt="More" />
        </ProjectVerticalDots>
        {showModalMenuListId === project.id && <ModalMenuList showModalMenuListId={showModalMenuListId} />}
        <ListTextArrow>
            <ProjectListText>{project.title}</ProjectListText>
            <ForwardArrowSvg
                onClick={() => updateStates({ selectedProjectId: project.id })}
            >
                <img src="./assets/icon-arrow-right.svg" alt="Forward" />
            </ForwardArrowSvg>
        </ListTextArrow>
    </ProjectsTasksList>;
}

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
