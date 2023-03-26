import React from "react";
import ModalMenuList from "./ModalMenuList";
import {
  ForwardArrowSvg,
  ListTextArrow,
  ProjectListText,
  ProjectsTasksList,
  ProjectVerticalDots,
} from "./Projects";

function DisplayProject({ project, updateStates, showModalMenuListId }) {
  return (
    <ProjectsTasksList key={project.id}>
      {" "}
      <ProjectVerticalDots
        onClick={() => updateStates({ showModalMenuListId: project.id })}
      >
        <img src="./assets/more-vertical.svg" alt="More" />
      </ProjectVerticalDots>
      {showModalMenuListId === project.id && (
        <ModalMenuList showModalMenuListId={showModalMenuListId} />
      )}
      <ListTextArrow>
        <ProjectListText>{project.title}</ProjectListText>
        <ForwardArrowSvg
          onClick={() => updateStates({ selectedProjectId: project.id })}
        >
          <img src="./assets/icon-arrow-right.svg" alt="Forward" />
        </ForwardArrowSvg>
      </ListTextArrow>
    </ProjectsTasksList>
  );
}

export default DisplayProject;
