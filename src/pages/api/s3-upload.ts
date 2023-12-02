import { NextRequest, NextResponse } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getAuth } from "@clerk/nextjs/server";
import { v4 as uuid } from "uuid";

export const config = {
  runtime: "edge"
};

const AWS_BUCKET_NAME = "repair-lab-images"; // TODO: extract to env

export default async function handler(req: NextRequest) {
  // Generate a presigned URL for uploading a file to S3
  switch (req.method) {
    case "POST":
      try {
        const { contentType, ...detail } = await req.json();
        const { userId } = getAuth(req);
        if (!userId) {
          return NextResponse.json({
            status: 401,
            error: "Unauthorised"
          });
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

        return Response.json({ url, fields });
      } catch (err) {
        return NextResponse.json({
          status: 500,
          error: `Error in generating s3 upload url:, ${err}`
        });
      }
    default:
      return NextResponse.json({
        status: 405,
        error: "POST requests only"
      });
  }
}
