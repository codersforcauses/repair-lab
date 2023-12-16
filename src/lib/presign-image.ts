import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { AWS_BUCKET_NAME, s3client } from "@/lib/aws-client";

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
export { presignImage, presignImages };
