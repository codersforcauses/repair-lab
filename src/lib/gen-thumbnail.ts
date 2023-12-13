export default function generateThumbnail(
  imageFile: File,
  thumbnailHeight: number = 80
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      // Calculate the aspect ratio of the image
      const aspectRatio = img.width / img.height;
      const thumbnailWidth = thumbnailHeight * aspectRatio;

      // Set the canvas dimensions to the thumbnail size
      canvas.width = thumbnailWidth;
      canvas.height = thumbnailHeight;

      // Draw the image onto the canvas with the calculated dimensions
      ctx?.drawImage(img, 0, 0, thumbnailWidth, thumbnailHeight);

      const dataURL = canvas.toDataURL("image/jpeg");
      const blobBin = atob(dataURL.split(",")[1]);
      const array = [];
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      resolve(new Blob([new Uint8Array(array)], { type: "image/png" }));
    };

    img.onerror = () => {
      // Reject the promise if there was an error loading the image
      reject(new Error("Failed to load image"));
    };

    // Load the image file
    img.src = URL.createObjectURL(imageFile);
  });
}
