import prisma from "../../../prisma/client"

export default async function handler(req, res) {

    console.log("req.body", req.body)

    const id = req.query.id
    const data = JSON.parse(req.body)

    

    const task = await prisma.task.update(
        {
            where: { id: id },
            data: { 
                completed: data.completed,
                title: data.title,
             },
        }
    )

    console.log("completed", data.title)

  res.status(200).json({ id, completed: data.completed, title: data.title })
}
