import { NextRequest, NextResponse } from "next/server";
import {
  PutObjectCommand,
  PutObjectCommandInputType,
  PutObjectOutput,
  S3Client
} from "@aws-sdk/client-s3";

export const config = {
  runtime: "edge"
};

// const Files = z.object({
//   files: z.instanceof(File)
// });

export default async function handler(req: NextRequest) {
  switch (req.method) {
    case "POST":
      try {
        const data = await req.formData();
        const files = data.getAll("files") as File[];

        if (!Array.isArray(files)) {
          return NextResponse.json({
            status: 400,
            error: "Files must be an array"
          });
        }

        const responds: PutObjectOutput[] = [];
        for (const file of files) {
          const respond = await sendToBucket(file);
          responds.push(respond);
        }

        return NextResponse.json({
          status: 200,
          message: "Images uploaded successfully",
          responds: responds
        });
      } catch (err) {
        console.error("Error in uploading images!", err);
        return NextResponse.json({
          status: 400,
          error: "Error in uploading images!"
        });
      }
  }
}

async function sendToBucket(file: File) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileParams: PutObjectCommandInputType = {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: file.name,
      ContentType: file.type,
      Body: buffer
    };
    const s3 = new S3Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
      }
    });
    const command = new PutObjectCommand(fileParams);
    const respond = await s3.send(command);
    return respond;
  } catch (err) {
    console.error("Error in uploading image!", err);
    throw err;
  }
}
