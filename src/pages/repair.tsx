import * as React from "react";
import { useForm } from "react-hook-form";
import Field from "@/components/Field";

type RepairData = {
  id: string;
  item: string;
  brand: string;
  material: string;
  time: string;
  repaired: string;
  spare: string;
  parts: string;
  desc: string;
};

export default function repair() {
  const { control, handleSubmit } = useForm<RepairData>({
    defaultValues: {
      id: "",
      item: "",
      brand: "",
      material: "",
      time: "",
      repaired: "No",
      spare: "No",
      parts: "",
      desc: ""
    },
    mode: "onChange"
  });

  const onSubmit = handleSubmit((data) => {
    console.log(JSON.stringify(data));
  });

  const lineStyle = "mb-2 flex items-start gap-6";

  return (
    <main className="mx-3">
      <h1 className="mb-2 block text-xl text-red-500">General Repairs</h1>

      <form className="flex flex-col" onSubmit={onSubmit}>
        {/* ID, Item */}
        <div className={lineStyle}>
          <Field
            name="id"
            control={control}
            rules={{ required: true }}
            label="ID"
          />
          <Field name="item" control={control} rules={{ required: true }} />
        </div>

        {/* Brand, Material */}
        <div className={lineStyle}>
          <Field name="brand" control={control} rules={{ required: true }} />
          <Field name="material" control={control} rules={{ required: true }} />
        </div>

        {/* Time it took, Repaired? */}
        <div className={lineStyle}>
          <Field name="time" control={control} rules={{ required: true }} />
          <Field name="repaired" control={control} rules={{ required: true }} />
        </div>
        {/* Spare parts needed?, Part(s) needed */}
        <div className={lineStyle}>
          <Field name="spare" control={control} rules={{ required: true }} />
          <Field name="parts" control={control} rules={{ required: true }} />
        </div>
        {/* Job Description */}
        <div className={lineStyle}>
          <Field name="desc" control={control} rules={{ required: true }} />
        </div>
        {/* Submit */}
        <input type="submit" value="Submit" className="submit"></input>
      </form>
    </main>
  );
}
