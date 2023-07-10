import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import type { RepairAttempt } from "@/types";
import { RepairAttemptSchema } from "@/schema/repair-attempt";
import FieldInput from "@/components/Form Fields/field-input";
import FieldRadio from "@/components/Form Fields/field-radio";
import FieldTextArea from "@/components/Form Fields/field-text-area";
import Button from "@/components/Button";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const lineStyle = "mb-4 flex flex-row items-start gap-8";

export default function RepairAttempt() {
  const [display, setdisplay] = useState<string>("hidden");

  const { control, handleSubmit } = useForm<RepairAttempt>({
    resolver: zodResolver(RepairAttemptSchema),
    defaultValues: {
      id: "",
      item: "",
      itemBrand: "",
      itemMaterial: "",
      hoursWorked: undefined,
      isRepaired: undefined,
      isSparePartsNeeded: undefined,
      spareParts: "",
      repairComment: ""
    }
  });

  const onSubmit: SubmitHandler<RepairAttempt> = async (data) => {
    // console.log(JSON.stringify(data));
    const response = await fetch(`/api/repair-attempt`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      alert("Data submitted");
    } else {
      alert(`Error! ${response.statusText}`);
    }
  };

  return (
    <main
      className={`m-4 flex flex-col items-center gap-4 rounded-lg border-2 border-teal-300 bg-white shadow-md ${inter.className}`}
    >
      <h1 className="w-full rounded-t-lg bg-[#d9d9d9] py-3 pl-8 text-3xl font-semibold leading-normal text-grey-950">
        General Repair Attempt
      </h1>

      <form
        className="flex w-full min-w-[520px] flex-col flex-wrap p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* ID, Item */}
        <div className={lineStyle}>
          <FieldInput
            name="id"
            control={control}
            label="ID"
            rules={{ required: true }}
          />
          <FieldInput
            name="item"
            control={control}
            rules={{ required: true }}
          />
        </div>

        {/* Brand, Material */}
        <div className={lineStyle}>
          <FieldInput
            name="itemBrand"
            label="Brand"
            control={control}
            rules={{ required: true }}
          />
          <FieldInput
            name="itemMaterial"
            label="Material"
            placeholder="e.g. Wood, Metal, Plastic"
            control={control}
            rules={{ required: true }}
          />
        </div>

        {/* Time it took, Repaired? */}
        <div className={lineStyle}>
          <FieldInput
            name="hoursWorked"
            label="Time it took"
            placeholder="Time in hours, e.g. 1.5"
            control={control}
            rules={{ required: true }}
          />
          <FieldRadio
            name="isRepaired"
            control={control}
            label="Repaired?"
            rules={{ required: true }}
          />
        </div>

        {/* Spare parts needed?, Part(s) needed */}
        <div className={lineStyle}>
          <div className="min-w-[200px]">
            <FieldRadio
              name="isSparePartsNeeded"
              control={control}
              label="Spare parts needed?"
              onChange={(e) => {
                e.target.value === "true"
                  ? setdisplay("")
                  : setdisplay("hidden");
                console.log(display);
              }}
              rules={{ required: true }}
            />
          </div>
          <FieldInput
            name="spareParts"
            label="Parts needed"
            placeholder="e.g. 2x screws"
            control={control}
            display={display}
          />
        </div>

        {/* Job Description */}
        <div className={lineStyle}>
          <FieldTextArea
            name="repairComment"
            label="Job Description"
            placeholder="Describe the repair job in detail"
            control={control}
            rules={{ required: true }}
          />
        </div>

        {/* Submit */}
        <div className={`mt-5 ${lineStyle}`}>
          <Button
            onClick={handleSubmit(onSubmit)}
            width="w-1/6"
            height="h-9"
            textSize="text-base"
          >
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
}
