export async function fetchProjects() {
  const response = await fetch(`api/projects`);

  const data = await response.json();
  return data;
}

export async function renameProject(projectInEditModeId, projectEditTitle) {
  // we're sending a PATCH request to update project with a specific id
  // we're sending in the body an object with key title and the value of new title
  const response = await fetch(`api/projects/${projectInEditModeId}`, {
    method: "PATCH",
    body: JSON.stringify({
      id: projectInEditModeId,
      title: projectEditTitle,
    }),
  });

  // here we get data from the server. It's an object with id and title
  // id - id of project, title - updated value
  const data = await response.json();
}

export async function deleteProject(projectId) {
  const response = await fetch(`api/projects/${projectId}`, {
    method: "DELETE",
    body: JSON.stringify(projectId),
  });
  const data = await response.json();
}

export async function createProject(newProject) {
  const response = await fetch(`api/projects`, {
    method: "POST",
    body: JSON.stringify(newProject),
  });
  const data = await response.json();
}
