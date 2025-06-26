import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const delete1 = await prisma.users.deleteMany({
    where: {
      OR: [
        {
          id: "1",
        },
        {
          id: "2",
        },
        
      ],
    },
  });
}

async function clearPosts() {
  const deleteFiles = await prisma.file.deleteMany();
  const deleteArticles = await prisma.article.deleteMany();
}

clearPosts()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
