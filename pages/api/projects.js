import prisma from "../../prisma/client";

//step 1
export default async function handler(req, res) {
  //step 3
  if (req.method === "GET") {
    const projects = await prisma.project.findMany({
      include: {
        tasks: true,
      },
    });
    //step 4
    res.status(200).json({ projects: projects });
  } else if (req.method === "POST") {
    const id = req.query.id;
    const data = JSON.parse(req.body);

    const newProject = await prisma.project.create({
      data: {
        id: data.id,
        title: data.title,
      },
      include: {
        tasks: true,
      },
    });
    res.status(201).json({ newProject: newProject });
  }
}
