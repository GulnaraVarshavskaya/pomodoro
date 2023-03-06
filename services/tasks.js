export async function fetchTasks(id, completed) {
    // we're sending a PATCH request to update task with a specific id
    // we're sending in the body an object with key completed and the value of completed id not completed
    const response = await fetch(`api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !completed,
      }),
    });
    // here we get data from the server. It's an object with id and completed
    // id - id of task, completed - updated value
    const data = await response.json();
  }
  


export async function createTask(selectedProjectId, newTask) {
    const response = await fetch(`/api/projects/${selectedProjectId}/tasks/`, {
      method: "POST",
      body: JSON.stringify(newTask),
    });
    const data = await response.json();
  }

export async function renameTask(selectedTaskId, taskEditTitle) {
    const response = await fetch(`api/tasks/${selectedTaskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        id: selectedTaskId,
        title: taskEditTitle,
      }),
    });
    const data = await response.json();
  }
