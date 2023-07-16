import { useState } from "react";
import { Inter } from "next/font/google";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import FieldInput from "@/components/Form Fields/field-input";
import FieldRadio from "@/components/Form Fields/field-radio";
import FieldTextArea from "@/components/Form Fields/field-text-area";
import { RepairAttemptSchema } from "@/schema/repair-attempt";
import type { RepairAttempt } from "@/types";

const inter = Inter({ subsets: ["latin"] });

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
      <h1 className="w-full rounded-t-lg bg-[#d9d9d9] px-5 py-3 text-3xl font-semibold leading-normal  text-grey-950 max-[415px]:text-center max-[415px]:text-lg">
        General Repair Attempt
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ID, Item */}
        <div className="m-5 flex flex-wrap gap-2 max-[415px]:m-2">
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

          {/* Brand, Material */}
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

          {/* Time it took, Repaired? */}
          <FieldInput
            name="hoursWorked"
            label="Time it took"
            placeholder="Time in hours, e.g. 1.5"
            control={control}
            rules={{ required: true }}
          />

          {/* Spare parts needed?, Part(s) needed */}
          <div className="flex w-full flex-row gap-8 max-[415px]:gap-3">
            <FieldRadio
              name="isRepaired"
              control={control}
              label="Repaired?"
              rules={{ required: true }}
            />

            <FieldRadio
              name="isSparePartsNeeded"
              control={control}
              label="Spare parts needed?"
              onChange={(e) => {
                e.target.value === "true"
                  ? setdisplay("")
                  : setdisplay("hidden");
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
            rules={{ required: display === "hidden" ? false : true }}
          />

          {/* Job Description */}
          <FieldTextArea
            name="repairComment"
            label="Job Description"
            placeholder="Describe the repair job in detail"
            control={control}
            rules={{ required: true }}
          />
        </div>

        {/* Submit */}
        <div className="my-5 flex flex-row">
          <Button
            onClick={handleSubmit(onSubmit)}
            height="h-9"
            width="w-1/3"
            textSize="text-base"
          >
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
}
