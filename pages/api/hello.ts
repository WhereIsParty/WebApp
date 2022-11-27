// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Users } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  users: Users[];
};

type Error = {
  msg: string;
};

type Response = Data | Error;

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const connection = await main();
    const allUsers = await prisma.users.findMany();

    res.status(200).json({ users: allUsers });
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    res.status(404).json({ msg: 'Node fa schifo!' });
  }
}
