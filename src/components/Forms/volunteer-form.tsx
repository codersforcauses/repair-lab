import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brand, ItemType } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import FieldMultiSelect from "@/components/FormFields/field-multi-select";
import { updateRepairRequestSchema } from "@/schema/repair-request";
import type { GeneralRepairAttempt } from "@/types";
export default function RepairAttemptForm({
  itemBrands,
  itemTypes,
  onSubmit
}: {
  itemBrands?: Brand[];
  itemTypes?: ItemType[];
  onSubmit?: SubmitHandler<GeneralRepairAttempt>;
}) {
  const { watch, control, handleSubmit } = useForm<GeneralRepairAttempt>({
    resolver: zodResolver(updateRepairRequestSchema),
    defaultValues: {
      item: ""
    }
  });

  let actualItemBrands;
  itemBrands
    ? (actualItemBrands = itemBrands.map((type) => ({
        id: type.name,
        text: type.name
      })))
    : (actualItemBrands = [
        { id: 0, text: "Alienware" },
        { id: 1, text: "Giant Bicycles" },
        { id: 2, text: "Seiko" }
      ]);

  let actualItemTypes;
  itemTypes
    ? (actualItemTypes = itemTypes.map((type) => ({
        id: type.name,
        text: type.name
      })))
    : (actualItemTypes = [
        { id: 0, text: "Bike" },
        { id: 1, text: "Clock" },
        { id: 2, text: "Computer" }
      ]);

  const watchIsSparePartsNeeded = watch("isSparePartsNeeded");

  const defaultOnSubmit: SubmitHandler<GeneralRepairAttempt> = async (data) => {
    // console.log(JSON.stringify(data));
    const response = await fetch(`/api/repair-request`, {
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
  <DevTool control={control} />;
  return (
    <form onSubmit={handleSubmit(onSubmit ? onSubmit : defaultOnSubmit)}>
      {/* ID, Item */}
      <div className="m-5 flex flex-wrap gap-2 max-[415px]:m-2">
        <FieldMultiSelect
          name="item"
          control={control}
          rules={{ required: true }}
          options={actualItemTypes}
        />
      </div>

      {/* Submit */}
      <div className="my-5 flex flex-row">
        <Button
          onClick={handleSubmit(onSubmit ? onSubmit : defaultOnSubmit)}
          height="h-9"
          width="w-1/3"
          textSize="text-base"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
