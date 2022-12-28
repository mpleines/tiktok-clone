import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userid } = req.query;

  if (req.method === "GET") {
    const posts = await prisma.post.findMany({
      where: { authorId: Number(userid) },
      orderBy: [{ createdAt: "desc" }],
    });

    const user = await prisma.user.findUnique({
      where: { id: Number(userid) },
    });

    const data = { posts, user };

    return res.status(200).send(data);
  }
}
