import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import FieldImageUpload from "@/components/FormFields/field-image-upload";

interface FormData {
  single: File;
  multiple: File[];
}

export default function Test() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section className="container mx-auto flex min-h-screen flex-col items-center justify-between">
      <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
        <div>
          <h2 className="text-xl font-bold">Test Single</h2>
          <FieldImageUpload name="single" control={control} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Test Multiple</h2>
          <FieldImageUpload name="multiple" control={control} multiple />
        </div>
        <Button width="w-full">Submit</Button>
      </form>
    </section>
  );
}
