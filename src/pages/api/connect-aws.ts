import { NextApiRequest, NextApiResponse } from 'next';
import { S3 } from "aws-sdk/clients/s3";
import axios from "axios";

async function SendToBucket(file: File) {
  try {
    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.name,
      ContentType: file.type
    };

    const s3 = new S3({
      region: process.env.AWS_BUCKET_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      signatureVersion: "v4"
    });

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    await axios.put(url, file, {
      headers: {
        "Content-Type": String(file.type)
      }
    });

    console.log("Uploaded image!");
  } catch (err) {
    console.log("Error in uploading image!");
    throw err;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { file } = req.body;

    await SendToBucket(file);

    console.log("Uploaded image!");

    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (err) {
    console.log("Error in uploading image!", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
}
