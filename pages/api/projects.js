import prisma from "../../prisma/client"

//step 1
export default async function handler(req, res) {
  //step 3
  const projects = await prisma.project.findMany(
    {
      include: {
        tasks: true,
      },
    }
  )
  //step 4
  res.status(200).json({ projects: projects })
}
