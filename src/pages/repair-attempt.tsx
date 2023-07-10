import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import type { RepairAttempt } from "@/types";
import { RepairAttemptSchema } from "@/schema/repair-attempt";
import FieldInput from "@/components/field-input";
import FieldRadio from "@/components/field-radio";
import FieldTextArea from "@/components/field-text-area";
import Button from "@/components/Button";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RepairAttempt() {
  const { control, handleSubmit } = useForm<RepairAttempt>({
    resolver: zodResolver(RepairAttemptSchema),
    defaultValues: {
      id: "",
      item: "",
      itemBrand: "",
      itemMaterial: "",
      hoursWorked: 1,
      isRepaired: false,
      isSparePartsNeeded: false,
      spareParts: "",
      repairComment: ""
    }
  });

  const onSubmit: SubmitHandler<RepairAttempt> = async (data) => {
    console.log(JSON.stringify(data));
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

  const lineStyle = "mb-4 flex items-start gap-8";

  return (
    <main
      className={`bg-whiteshadow-md m-4 flex min-h-screen flex-col items-center gap-4 rounded-lg border-2 border-teal-300 ${inter.className}`}
    >
      <h1 className="w-full rounded-t-lg bg-[#d9d9d9] py-3 pl-8 text-3xl font-semibold leading-normal text-grey-950">
        General Repair Attempt
      </h1>

      <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
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
            control={control}
            rules={{ required: true }}
          />
        </div>

        {/* Time it took, Repaired? */}
        <div className={lineStyle}>
          <FieldInput
            name="hoursWorked"
            label="Time it took"
            control={control}
            rules={{ required: true }}
          />
          <FieldRadio
            name="isRepaired"
            control={control}
            label="Repaired?"
            rules={{ required: true }}
            placeholder="Yes/No"
          />
        </div>

        {/* Spare parts needed?, Part(s) needed */}
        <div className={lineStyle}>
          <FieldRadio
            name="isSparePartsNeeded"
            control={control}
            label="Spare parts needed?"
            rules={{ required: true }}
            placeholder="Yes/No"
          />
          <FieldInput
            name="spareParts"
            label="Parts needed"
            control={control}
          />
        </div>

        {/* Job Description */}
        <div className={lineStyle}>
          <FieldTextArea
            name="repairComment"
            label="Job Description"
            control={control}
            rules={{ required: true }}
          />
        </div>

        {/* Submit */}
        <div className={`mt-4 ${lineStyle}`}>
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
