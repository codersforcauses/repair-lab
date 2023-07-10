import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import FieldInput from "@/components/field-input";
import FieldRadio from "@/components/field-radio";
import FieldTextArea from "@/components/field-text-area";
import type { RepairAttempt } from "@/schema/repair-attempt";
import { RepairAttemptSchema } from "@/schema/repair-attempt";

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
      comment: ""
    }
  });

  const onSubmit: SubmitHandler<RepairAttempt> = (data) => {
    console.log(JSON.stringify(data));
  };

  const lineStyle = "mb-2 flex items-start gap-6";

  return (
    <main className="box">
      <h1 className="heading">General Repair Attempt</h1>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
          <FieldInput
            name="isRepaired"
            label="Repaired?"
            control={control}
            rules={{ required: true }}
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
            name="comment"
            label="Job Description"
            control={control}
            rules={{ required: true }}
          />
        </div>

        <div className={lineStyle}>
          {/* Submit */}
          <Button
            onClick={handleSubmit(onSubmit)}
            width="w-1/6"
            position="ml-auto"
          >
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
}
