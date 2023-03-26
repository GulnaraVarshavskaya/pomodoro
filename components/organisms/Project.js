import React from "react";
import EditProject from "./EditProject";
import DisplayProject from "./DisplayProject";

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


