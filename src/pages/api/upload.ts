import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const config = {
  runtime: "edge"
};

// const Files = z.object({
//   files: z.instanceof(File)
// });

export default async function handler(req: NextRequest) {
  // switch (req.method) {
  // case "POST":
  try {
    console.log("##########");
    const data = await req.formData();

    console.dir(data.getAll("files"));

    // const filesArray = req.body.files as File[];
    // const filesArray = files.files as File[];

    const files = data.getAll("files");

    // TODO: Check files have been passed as an array
    if (!Array.isArray(files)) {
      console.log("files are not in array");
      return NextResponse.json({
        status: 400,
        error: "Files must be an array"
      });
    }

    const signedUrls: string[] = [];
    for (const file of files) {
      // TODO send to bucket
      const signedUrl = await sendToBucket(file);
      signedUrls.push(signedUrl);
    }

    console.log("sent each file to bucket");
    console.log("sent each file to bucket");
    console.log("Uploaded images!");

    return NextResponse.json({
      status: 200,
      signedUrls: signedUrls,
      message: "Images uploaded successfully"
    });
  } catch (err) {
    console.log("Error in uploading images!", err);
    return NextResponse.json({
      status: 400,
      error: "Files must be an array"
    });
  }
}

async function sendToBucket(file: File) {
  try {
    console.log("sendToBucket");
    console.log("fileParams");
    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.name,
      ContentType: file.type,
      Body: file
    };
    console.log("new S3 object");
    const s3 = new S3Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
      }
    });
    console.log("signed url promise");
    const command = new PutObjectCommand(fileParams);
    await s3.send(command);
    let url;
    try {
      url = await getSignedUrl(s3, command);
    } catch (err) {
      console.log("Error in getting signed url!");
      console.log(err);
    }

    console.log("url", url as string);
    return url;
  } catch (err) {
    console.log("Error in uploading image!");
    throw err;
  }
}
