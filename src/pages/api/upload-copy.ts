import { NextApiRequest, NextApiResponse } from "next";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false
  }
};

// const Files = z.object({
//   files: z.instanceof(File)
// });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // switch (req.method) {
  // case "POST":
  try {
    console.log("##########");
    // console.log(req.body);

    // Use Formidable to parse and read the request body FormData type object
    const form = formidable({ keepExtensions: true });
    const formData = await new Promise(function (resolve, reject) {
      form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        resolve({ err, fields, files });
      });
    });

    const { files } = await formData;

    console.log(files.files[0].originalFilename);

    // const filesArray = req.body.files as File[];
    const filesArray = files.files as File[];

    // TODO: Check files have been passed as an array
    if (!Array.isArray(filesArray)) {
      console.log("files are not in array");
      return res.status(400).json({ error: "Files must be an array" });
    }

    const signedUrls: string[] = [];
    for (const file of filesArray) {
      // TODO send to bucket
      const signedUrl = await sendToBucket(file);
      signedUrls.push(signedUrl);
    }

    console.log("sent each file to bucket");
    console.log("sent each file to bucket");
    console.log("Uploaded images!");

    res.status(200).json({
      signedUrls: signedUrls,
      message: "Images uploaded successfully"
    });
  } catch (err) {
    console.log("Error in uploading images!", err);
    res.status(500).json({ error: "Failed to upload images" });
  }
}

async function sendToBucket(file: any) {
  try {
    console.log("sendToBucket");
    console.log("fileParams");
    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalFilename,
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
    const url = await getSignedUrl(s3, command);

    console.log("url", url as string);
    return url;
  } catch (err) {
    console.log("Error in uploading image!");
    throw err;
  }
}
