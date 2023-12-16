import { S3Client } from "@aws-sdk/client-s3";

export const AWS_BUCKET_NAME = "repair-lab-images"; // TODO: extract to env

export const s3client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!
  }
});