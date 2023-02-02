import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  const id = req.query.id;
  const data = JSON.parse(req.body);

  console.log("data", data);

  const newTask = await prisma.task.create({
    data: {
      id: data.id,
      title: data.title,
      projectId: data.projectId,
      completed: data.completed,
    },
  });
  res.status(201).json({ newTask: newTask });
}
