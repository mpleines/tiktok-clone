import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import B2 from 'backblaze-b2';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { file, ...rest } = req.body;
  const { base64, mimeType } = file;
  const post = rest;

  try {
    // upload video to backblaze
    // FIXME: do not push this! move to .env files
    const backblaze = new B2({
      applicationKeyId: '004896f07f8979a0000000001',
      applicationKey: 'K004hFiR+epD5TLkRGJXwUUOFBNiTDQ',
    });

    await backblaze.authorize();

    const { uploadUrl, authorizationToken } = await backblaze
      .getUploadUrl(
        { bucketId: '38e9f6df60c79f788927091a' }
      ).then(res => ({
        uploadUrl: res.data.uploadUrl as string,
        authorizationToken: res.data.authorizationToken
      }));

    const uploadResponse = await backblaze.uploadFile({
      uploadUrl,
      uploadAuthToken: authorizationToken,
      fileName: 'test',
      data: Buffer.from(base64, 'base64'),
      onUploadProgress: (event) => {console.log(event)},
      mime: mimeType,
    });

    const fileId = uploadResponse.data.fileId;

    const baseBackblazeDownloadUrl = `https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=`;
    const videoUrl = `${baseBackblazeDownloadUrl}${fileId}`

    const response = await prisma.post.create({ data: { ...post, videoUrl } });

    res.status(200).send({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
