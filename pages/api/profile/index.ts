import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const user = await prisma.user.findMany();

    return res.status(200).send(user);
  }
}
