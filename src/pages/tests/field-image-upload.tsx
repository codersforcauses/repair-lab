import { useForm } from "react-hook-form";

import FieldImageUpload from "@/components/Form Fields/field-image-upload";

export default function Test() {
  const { control } = useForm();
  return (
    <section className="container mx-auto flex min-h-screen flex-col items-center justify-between">
      <div className="flex w-full flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold">Test Single</h2>
          <FieldImageUpload name="test" control={control} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Test Multiple</h2>
          <FieldImageUpload name="test" control={control} multiple />
        </div>
      </div>
    </section>
  );
}
