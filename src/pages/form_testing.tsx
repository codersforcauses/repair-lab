import * as React from "react";
import { useForm } from "react-hook-form";

import Field_Input from "@/components/field-input";
import Field_Radio from "@/components/field-radio";
import Field_Text_Area from "@/components/field-text-area";

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
  comments: string;
};

export default function Repair() {
  const { control, handleSubmit } = useForm<RepairData>({
    defaultValues: {
      id: "",
      item: "",
      brand: "",
      material: "",
      time: "",
      repaired: "",
      spare: "",
      parts: "",
      desc: "",
      comments: ""
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
          <Field_Input
            name="id"
            control={control}
            rules={{ required: true }}
            label="ID"
          />
          <Field_Input
            name="item"
            control={control}
            rules={{ required: true }}
          />
        </div>

        {/* Brand, Material */}
        <div className={lineStyle}>
          <Field_Input
            name="brand"
            control={control}
            rules={{ required: true }}
          />
          <Field_Input
            name="material"
            control={control}
            rules={{ required: true }}
          />
        </div>

        {/* Time it took, Repaired? */}
        <div className={lineStyle}>
          <Field_Input
            name="time"
            control={control}
            rules={{ required: true }}
          />
          <Field_Radio
            name="repaired"
            control={control}
            rules={{ required: true }}
          />
        </div>
        {/* Spare parts needed?, Part(s) needed */}
        <div className={lineStyle}>
          <Field_Radio
            name="spare"
            control={control}
            rules={{ required: true }}
          />
          <Field_Input
            name="parts"
            control={control}
            rules={{ required: true }}
          />
        </div>
        {/* Job Description */}
        <div className={lineStyle}>
          <Field_Input
            name="desc"
            control={control}
            rules={{ required: true }}
          />
        </div>
        {/* Comments */}
        <div className={lineStyle}>
          <Field_Text_Area
            name="comments"
            control={control}
            rules={{ required: false }}
          />
        </div>
        {/* Submit */}
        <input type="submit" value="Submit" className="submit"></input>
      </form>
    </main>
  );
}
