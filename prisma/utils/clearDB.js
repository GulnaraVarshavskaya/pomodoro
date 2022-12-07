const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function runSeeders() {
    await prisma.task.deleteMany({ where: {} })
    await prisma.project.deleteMany({ where: {} })
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