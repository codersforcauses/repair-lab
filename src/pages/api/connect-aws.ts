import { S3 } from "aws-sdk";
import axios from "axios";

export default async function SendToBucket(file: File) {
  try {
    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.name,
      ContentType: file.type
    }

    const s3 = new S3({
      signatureVersion: "v4"
    })
    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    await axios.put(url, file, {
      headers:
      {
        "Content-Type": String(file.type)
      }
    })
    console.log("Uploaded image!")
  }
  catch(err) {
    console.log("Error in uploading image!");
    return err
  }

}