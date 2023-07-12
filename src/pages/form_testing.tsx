import * as React from "react";
import { useForm } from "react-hook-form";

import DropDown from "@/components/Form Fields/dropdown-headless";
import Field_Input from "@/components/Form Fields/field-input";
import Field_Radio from "@/components/Form Fields/field-radio";
import Field_Text_Area from "@/components/Form Fields/field-text-area";

/**
 * This is a sample form page using React Hook Form for testing purposes
 * It is based on the General Repairs form
 * Feel free to dabble around
 */
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
  dropdown: string;
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
      comments: "",
      dropdown: ""
    },
    mode: "onChange"
  });

  const onSubmit = handleSubmit((data) => {
    console.log(JSON.stringify(data));
  });

  const lineStyle = "mb-2 flex items-start gap-6";
  const [selected, setSelected] = React.useState("");
  return (
    <main className="mx-3">
      <h1 className="mb-2 block text-xl text-red-500">General Repairs</h1>

      <form className="flex flex-col" onSubmit={onSubmit}>
        {/* ID, Item */}
        <div className={lineStyle}>
          <Field_Input
            name="id"
            control={control}
            rules={{ required: "true" }}
            label="ID"
            icon="https://file.rendit.io/n/WO0yqXIkWlVzApILek8q.svg"
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

        <DropDown
          name="dropdown"
          control={control}
          placeholder="Select an Item"
          header="header"
          required={true}
          options={[
            {
              id: 0,
              text: "Option1"
            },
            {
              id: 1,
              text: "Option2"
            },
            {
              id: 2,
              text: "Option3"
            },
            {
              id: 3,
              text: "LongerOption4"
            },
            {
              id: 4,
              text: "EvenLongerOption5"
            },
            {
              id: 5,
              text: "Option6"
            },
            {
              id: 6,
              text: "Option7"
            },
            {
              id: 7,
              text: "A really really long option for the purpose of testing"
            }
          ]}
        />

        {/* Comments */}
        <div className={lineStyle}>
          <Field_Text_Area
            name="comments"
            control={control}
            rules={{ required: true }}
            icon="https://file.rendit.io/n/WO0yqXIkWlVzApILek8q.svg"
          />
        </div>
        {/* Submit */}
        <input type="submit" value="Submit" className="submit"></input>
      </form>
    </main>
  );
}
