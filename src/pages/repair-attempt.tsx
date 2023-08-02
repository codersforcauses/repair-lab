import { Inter } from "next/font/google";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "@/components/Button";
import FieldInput from "@/components/FormFields/field-input";
import FieldRadio from "@/components/FormFields/field-radio";
import FieldTextArea from "@/components/FormFields/field-text-area";
import Toast from "@/components/Toast";
import { repairRequestPatchSchema } from "@/schema/repair-request";
import type { GeneralRepairAttempt } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export default function RepairAttempt() {
  const { watch, control, handleSubmit } = useForm<GeneralRepairAttempt>({
    resolver: zodResolver(repairRequestPatchSchema),
    defaultValues: {
      id: "",
      item: "",
      itemBrand: "",
      itemMaterial: "",
      hoursWorked: 1,
      isRepaired: undefined,
      isSparePartsNeeded: undefined,
      spareParts: "",
      description: ""
    }
  });

  const watchIsSparePartsNeeded = watch("isSparePartsNeeded");

  const onSubmit: SubmitHandler<GeneralRepairAttempt> = async (data) => {
    const loadingToastId = toast.loading("Submitting data...");
    const response = await fetch(`/api/repair-request`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    toast.dismiss(loadingToastId);
    if (response.ok) {
      toast.success("Data submitted!");
    } else {
      toast.error(`Error! ${response.statusText}`);
    }
  };

  return (
    <main
      className={`flex flex-col items-center gap-4 rounded-lg border-2 border-teal-300 bg-white shadow-md max-[768px]:m-7 md:mx-auto md:my-7 md:w-[768px]  ${inter.className}`}
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
              rules={{ required: true }}
            />
          </div>

          {watchIsSparePartsNeeded === "true" && (
            <FieldInput
              name="spareParts"
              label="Parts needed"
              placeholder="e.g. 2x screws"
              control={control}
              rules={{
                required: watchIsSparePartsNeeded === "true" ? true : false
              }}
            />
          )}

          {/* Job Description */}
          <FieldTextArea
            name="description"
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
      <Toast />
    </main>
  );
}
