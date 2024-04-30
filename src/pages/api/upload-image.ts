import type { NextApiRequest, NextApiResponse } from "next";

import apiHandler from "@/lib/api-handler";
import { presignPost } from "@/services/s3";

export default apiHandler({
  post: preUpload
});

async function preUpload(req: NextApiRequest, res: NextApiResponse) {
  // Generate a presigned URL for uploading a file to S3
  const { contentType, ...detail } = req.body;

  if (
    ["image/jpeg", "image/jpg", "image/png", "image/webp"].indexOf(
      contentType
    ) === -1
  ) {
    return res.status(400).json({ message: "Invalid image type" });
  }

  const { url, fields } = await presignPost(contentType, detail);

  return res.status(200).json({ url, fields });
}
