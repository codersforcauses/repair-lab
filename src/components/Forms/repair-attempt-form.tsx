import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import FieldInput from "@/components/FormFields/field-input";
import FieldRadio from "@/components/FormFields/field-radio";
import FieldSingleSelect from "@/components/FormFields/field-single-select";
import FieldTextArea from "@/components/FormFields/field-text-area";
import Toast from "@/components/Toast";
import { ItemType, useItemTypes } from "@/hooks/item-types";
import { useUpdateRepairRequest } from "@/hooks/repair-request";
import { updateRepairRequestSchema } from "@/schema/repair-request";
import type { GeneralRepairAttempt, RepairRequestResponse } from "@/types";
import { formatDate } from "@/utils";

export type RepairAttemptProps = {
  requestDate: string;
  props: RepairRequestResponse;
};

export default function RepairAttempt({
  props
}: {
  props: RepairRequestResponse;
}) {
  const {
    query: { id }
  } = useRouter();

  const { mutate: updateRepairRequest } = useUpdateRepairRequest(id as string);

  const { data: itemTypes } = useItemTypes();

  let isSparePartsNeeded;
  props.spareParts == ""
    ? (isSparePartsNeeded = "")
    : (isSparePartsNeeded = "true");

  const { watch, control, handleSubmit } = useForm<GeneralRepairAttempt>({
    resolver: zodResolver(updateRepairRequestSchema),
    defaultValues: {
      item: props.itemType,
      itemBrand: props.itemBrand,
      itemMaterial: props.itemMaterial,
      hoursWorked: Number(props.hoursWorked),
      isRepaired: undefined,
      isSparePartsNeeded: isSparePartsNeeded,
      spareParts: props.spareParts,
      repairComment: props.repairComment
    }
  });

  const watchIsSparePartsNeeded = watch("isSparePartsNeeded");

  const onSubmit: SubmitHandler<GeneralRepairAttempt> = async (data) => {
    updateRepairRequest(data);
  };

  return (
    <main
    //  className={`flex flex-col items-center gap-4 rounded-lg border-2 border-teal-300 bg-slate-100 shadow-md max-[768px]:m-7 md:mx-auto md:my-7 md:w-[768px]  ${inter.className}`}
    >
      {/* <h1 className="w-full rounded-t-lg px-5 py-3 text-3xl font-semibold leading-normal  text-grey-950 max-[415px]:text-center max-[415px]:text-lg">
        General Repair Attempt
        <p>ID: {id}</p>
      </h1> */}
      {/* <h1 className="flex justify-center sm:text-4xl text-2xl font-bold pt-5 ">
        {" "}
        General Repair Attempt
      </h1> */}
      <h4 className="flex justify-center text-xl max-[860px]:text-lg max-[640px]:text-base font-bold text-primary-500 pb-2">
        Repair Request ID: {props.id}
      </h4>
      <h4 className="flex justify-center text-xl max-[860px]:text-lg max-[640px]:text-base font-bold text-primary-500 max-[860px]:pb-0 pb-2">
        Requested By: {props.createdBy.id} on{" "}
        {formatDate(String(props.requestDate))}
      </h4>
      {/* <h4 className="flex justify-center sm:text-xl font-bold pb-2 pt-5">
      Item Type: {props.itemType}
      </h4> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ID, Item */}
        <div className="m-5 flex flex-wrap gap-6 max-[415px]:m-2 max-[860px]:mt-5 mt-10 xl:mx-14">
          <div className="m-auto flex flex-wrap w-3/4 gap-2 max-[415px]:m-2 mt-2">
            <FieldSingleSelect
              name="item"
              placeholder="eg. Computer, Bike..."
              control={control}
              rules={{ required: true }}
              options={
                itemTypes
                  ? itemTypes.map((itemType: ItemType) => {
                      return { id: itemType.name, text: itemType.name };
                    })
                  : []
              }
            />

            {/* Brand, Material */}
            <FieldInput
              name="itemBrand"
              label="Brand"
              placeholder="eg. Alienware..."
              control={control}
              rules={{ required: true }}
            />
            <FieldInput
              name="itemMaterial"
              label="Material"
              placeholder="e.g. Wood, Metal, Plastic..."
              control={control}
              rules={{ required: true }}
            />
          </div>
          <FieldInput
            name="hoursWorked"
            label="Hours taken"
            width="w-full min-w-20"
            height="min-h-10"
            placeholder="Time in hours, e.g. 1.5..."
            control={control}
            rules={{ required: true }}
          />
          {/* Spare parts needed?, Part(s) needed */}
          <div className="flex w-full flex-row justify-center gap-4 max-[415px]:gap-3">
            {/* Time it took, Repaired? */}
            <FieldRadio
              name="isRepaired"
              width="w-[49%]"
              height="min-h-10 max-[960px]:min-h-20"
              axis="flex-col sm:flex-row"
              control={control}
              label="Repaired?"
              rules={{ required: true }}
            />
            <FieldRadio
              name="isSparePartsNeeded"
              width="w-[49%]"
              height="min-h-10 max-[960px]:min-h-20"
              axis="flex-col sm:flex-row"
              labelYPosition="-top-6 sm:-top-3 max-[450px]:-top-10"
              control={control}
              label="Spare parts needed?"
              rules={{ required: true }}
            />
          </div>

          {watchIsSparePartsNeeded === "true" && (
            <FieldInput
              name="spareParts"
              label="Parts needed"
              placeholder="e.g. 2x screws..."
              control={control}
              rules={{
                required: watchIsSparePartsNeeded === "true" ? true : false
              }}
            />
          )}

          {/* Repair Comment */}
          <FieldTextArea
            name="repairComment"
            label="Repair Comment"
            placeholder="Describe the repair job in detail..."
            control={control}
            rules={{ required: true }}
          />
          {/* Submit */}
          <div className="my-0 w-full">
            <Button
              height="h-12"
              width="w-full"
              textSize="text-lg"
              textWeight="font-semibold"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      <Toast />
    </main>
  );
}
