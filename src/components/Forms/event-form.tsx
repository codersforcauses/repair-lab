import type { Event, ItemType } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import FieldInput from "@/components/FormFields/field-input";
import FieldMultiSelect from "@/components/FormFields/field-multi-select";

export default function EventForm({
  itemTypes,
  onSubmit
}: {
  itemTypes: ItemType[];
  onSubmit: SubmitHandler<Event>;
}) {
  const { control, handleSubmit } = useForm<Event>({
    defaultValues: {
      id: "",
      name: "",
      createdBy: "",
      startDate: undefined,
      eventType: "",
      status: undefined
    }
  });

  return (
    <>
      <h1 className="mb-3 text-center text-2xl">Add a New Event</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 space-y-3">
          <FieldInput control={control} name="name"></FieldInput>
          <FieldInput control={control} name="createdBy"></FieldInput>
          <FieldInput control={control} name="startDate"></FieldInput>
          <FieldMultiSelect
            control={control}
            name="eventType"
            options={itemTypes.map((type) => ({
              id: type.name,
              text: type.name
            }))}
          ></FieldMultiSelect>
          <FieldMultiSelect
            control={control}
            name="status"
            options={[
              { id: 0, text: "UPCOMING" },
              { id: 1, text: "ONGOING" },
              { id: 2, text: "COMPLETED" }
            ]}
          ></FieldMultiSelect>
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
    </>
  );
}
