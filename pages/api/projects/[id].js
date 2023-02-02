import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  console.log("req.body", req.body);

  const id = req.query.id;
  const data = JSON.parse(req.body);

  console.log("title", data.title);

  const project = await prisma.project.update({
    where: { id: id },
    data: { title: data.title },
    include: {
      tasks: true,
    },
  });

  res.status(200).json({ id, title: data.title });
}
