import prisma from "../../../prisma/client"

export default async function handler(req, res) {

    console.log("req.body", req.body)

    const id = req.query.id
    const data = JSON.parse(req.body)

    console.log("completed", data.completed)

    const task = await prisma.task.update(
        {
            where: { id: id },
            data: { completed: data.completed },
        }
    )

  res.status(200).json({ id, completed: data.completed })
}
