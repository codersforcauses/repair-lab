import axios from "axios";

/**
 * Upload a image to S3
 * @param file File to upload
 * @param detail Additional details to store in S3
 * @returns URL of the uploaded file
 * Only accept jpg, jpeg, png, webp in backend
 * Implemented based on
 * https://vercel.com/templates/next.js/aws-s3-image-upload-nextjs
 */
export async function uploadImage(
  file: Blob,
  detail?: Record<string, unknown>
) {
  const response = await axios.post("/api/upload-image", {
    contentType: file.type,
    ...detail
  });

  if (response.status !== 200)
    throw new Error("Error in generating s3 presigned url");

  const { url, fields } = response.data;
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  formData.append("file", file);

  await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return fields.key;
}

export default uploadImage;
