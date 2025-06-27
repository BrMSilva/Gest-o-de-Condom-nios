import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient;

import { genPassword } from "../lib/passwordUtils.ts";

const pw = genPassword('teste')

async function main() {
  const test = await prisma.user.upsert({
    where: { email: 'teste@teste.com' },
    update: {},
    create: {
      email: 'teste@teste.com',
      firstname: 'teste',
      lastname: 'teste',
      password: pw.hashPw,
      salt: pw.salt,
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })