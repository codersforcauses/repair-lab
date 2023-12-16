import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuid } from "uuid";
import apiHandler from "@/lib/api-handler";
import type { NextApiRequest, NextApiResponse } from "next";

const AWS_BUCKET_NAME = "repair-lab-images"; // TODO: extract to env

export default apiHandler({
  post: preUpload
});

async function preUpload(req: NextApiRequest, res: NextApiResponse) {
  // Generate a presigned URL for uploading a file to S3
  const { contentType, ...detail } = req.body;

  if (
    ["image/jpeg", "image/jpg", "image/png", "image/webp"].indexOf(
      contentType
    ) === -1
  ) {
    return res.status(400).json({ message: "Invalid image type" });
  }

  const client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_KEY!
    }
  });

  const { url, fields } = await createPresignedPost(client, {
    Bucket: AWS_BUCKET_NAME,
    Key: uuid(),
    Conditions: [
      ["content-length-range", 0, 10485760], // up to 10 MB
      ["starts-with", "$Content-Type", contentType]
    ],
    Fields: {
      // acl: 'public-read', // The bucket is default to public-read
      "Content-Type": contentType,
      "x-amz-meta-detail": JSON.stringify(detail)
    },
    Expires: 600 // Seconds before the presigned post expires. 3600 by default.
  });

  return res.status(200).json({ url, fields });
}
