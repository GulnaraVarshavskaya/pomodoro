const { PrismaClient } = require ("@prisma/client");

const prisma = new PrismaClient();

const deleteProject = async () => {
    await prisma.project.deleteMany({
      where: {
        title: {
          contains: "learn something"
        }
      }
    })
    console.log("Hi")

  }

module.exports = deleteProject