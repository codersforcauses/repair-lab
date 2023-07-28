import axios from "axios"; // Assuming you have installed Axios or another HTTP client
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import FieldImageUpload from "@/components/Form Fields/field-image-upload";

interface FormData {
  multiple: File[];
}

export default function Test() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData();

      data.multiple.forEach((file) => formData.append("files", file)); // Assuming your API expects 'files' field for multiple file uploads

      // Make the API request to your API route for S3 uploads
      const _ = await axios.post("/api/upload", formData);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error uploading file:", error);
    }
  });

  return (
    <section className="container mx-auto flex min-h-screen flex-col items-center justify-between">
      <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
        <div>
          <h2 className="text-xl font-bold">Test Multiple</h2>
          <FieldImageUpload name="multiple" control={control} multiple />
        </div>
        <Button width="w-full" type="submit">
          Submit
        </Button>
      </form>
    </section>
  );
}
