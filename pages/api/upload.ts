import { NextApiRequest, NextApiResponse } from "next";
import B2 from "backblaze-b2";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { file, ...rest } = req.body;
  const { base64, mimeType } = file;
  const post = rest;

  if (
    process.env.BACKBLAZE_APP_KEY_ID == null ||
    process.env.BACKBLAZE_APP_KEY == null
  ) {
    console.error("Backlaze not configured");
    return;
  }

  try {
    const backblaze = new B2({
      applicationKeyId: process.env.BACKBLAZE_APP_KEY_ID,
      applicationKey: process.env.BACKBLAZE_APP_KEY,
    });

    await backblaze.authorize();

    const { uploadUrl, authorizationToken } = await backblaze
      .getUploadUrl({ bucketId: "38e9f6df60c79f788927091a" })
      .then((res) => ({
        uploadUrl: res.data.uploadUrl as string,
        authorizationToken: res.data.authorizationToken,
      }));

    const uploadResponse = await backblaze.uploadFile({
      uploadUrl,
      uploadAuthToken: authorizationToken,
      fileName: "test",
      data: Buffer.from(base64, "base64"),
      onUploadProgress: (event) => {
        console.log(event);
      },
      mime: mimeType,
    });

    const fileId = uploadResponse.data.fileId;

    const baseBackblazeDownloadUrl = `https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=`;
    const videoUrl = `${baseBackblazeDownloadUrl}${fileId}`;

    const response = await prisma.post.create({ data: { ...post, videoUrl } });

    res.status(200).send({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
