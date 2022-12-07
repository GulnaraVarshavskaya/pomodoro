const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Projects = require('./data/projects');
const Tasks = require('./data/tasks');

async function runSeeders() {
  // Projects
  const projectsInDB = await Promise.all(
    Projects.map(async (project) =>
      prisma.project.upsert({
        where : { id: project.id },
        update: {},
        create: project,
      })
    )
  );
      console.log("projectsInDB", projectsInDB)
  // Tasks
  await Promise.all(
    Tasks.map(async (task) =>
      prisma.task.upsert({
        where: { id: task.id },
        update: {},
        create: task,
      })
    )
  );
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Successfully seeded database. Closing connection.');
    await prisma.$disconnect();
  });