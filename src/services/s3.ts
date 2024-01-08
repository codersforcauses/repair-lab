import { GetObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";

export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME!;
export const AWS_REGION = process.env.AWS_REGION!;

export const s3client = new S3Client({
  region: AWS_REGION
});

async function presignImage(key: string): Promise<string>;
async function presignImage(key: null): Promise<undefined>;
async function presignImage(key: string | null): Promise<string | undefined>;
async function presignImage(key: string | null) {
  if (!key) return undefined;
  const command = new GetObjectCommand({ Bucket: AWS_BUCKET_NAME, Key: key });
  return getSignedUrl(s3client, command, { expiresIn: 30 * 60 });
}

async function presignImages(keys: string[]) {
  return Promise.all(keys.map((key) => presignImage(key)));
}
/**
 * Create a presigned post for uploading a file to S3
 * @param contentType type of the file
 * @param detail extra detail to store in aws for possible future use
 * @returns
 */
async function presignPost(
  contentType: string,
  detail: Record<string, unknown>
) {
  return createPresignedPost(s3client, {
    Bucket: AWS_BUCKET_NAME,
    Key: uuid(),
    Conditions: [
      ["content-length-range", 0, 10485760], // up to 10 MB
      ["starts-with", "$Content-Type", contentType]
    ],
    Fields: {
      "Content-Type": contentType,
      "x-amz-meta-detail": JSON.stringify(detail)
    },
    Expires: 600 // Seconds before the presigned post expires. 3600 by default.
  });
}

export { presignImage, presignImages, presignPost };
