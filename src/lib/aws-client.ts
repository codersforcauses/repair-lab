import { S3Client } from "@aws-sdk/client-s3";

export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME!;
export const AWS_REGION = process.env.AWS_REGION!;

export const s3client = new S3Client({
  region: AWS_REGION
});
