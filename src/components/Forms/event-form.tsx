import { zodResolver } from "@hookform/resolvers/zod";
import type { ItemType } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { SlLocationPin } from "react-icons/sl";

import Button from "@/components/Button";
import FieldInput from "@/components/FormFields/CommonFields/field-input";
import FieldSingleSelect from "@/components/FormFields/CommonFields/field-single-select";
import FieldTextArea from "@/components/FormFields/CommonFields/field-text-area";
import { createEventSchema } from "@/schema/event";
import { CreateEvent } from "@/types";

export default function EventForm({
  itemTypes,
  onSubmit
}: {
  itemTypes: ItemType[];
  onSubmit: SubmitHandler<CreateEvent>;
}) {
  const { control, handleSubmit } = useForm<CreateEvent>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      startDate: "",
      endDate: "",
      eventType: "",
      disclaimer: ""
      // volunteers: []
    }
  });

  // TODO: Change the startDate and endDate input fields to use a date picker component.
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2 ">
          <FieldInput
            control={control}
            name="name"
            label="Event Name"
          ></FieldInput>

          <FieldSingleSelect
            control={control}
            name="eventType"
            label="Event Type"
            options={itemTypes.map((type) => ({
              id: type.name,
              text: type.name
            }))}
          ></FieldSingleSelect>

          <FieldInput
            control={control}
            name="location"
            label="Location"
            icon={<SlLocationPin className="w-4 shrink-0 h-full mr-4" />}
          ></FieldInput>

          <FieldTextArea
            name="description"
            label="Description"
            placeholder="Enter a description for the event"
            control={control}
            rules={{ required: false }}
            size="w-full h-36 md:col-span-2"
          />

          <FieldInput
            control={control}
            name="startDate"
            label="Start Date"
            type="datetime-local"
          ></FieldInput>

          <FieldInput
            control={control}
            name="endDate"
            label="End Date"
            type="datetime-local"
          ></FieldInput>

          <FieldTextArea
            name="disclaimer"
            label="Disclaimer"
            placeholder="Enter a disclaimer for the event"
            control={control}
            rules={{ required: false }}
            size="w-full h-30 md:col-span-2"
          />

          {/* <FieldMultiSelect
            control={control}
            name="volunteers"
            label="Volunteers"
            options={itemTypes.map((type) => ({
              id: type.name,
              text: type.name
            }))}
          ></FieldMultiSelect> */}
        </div>
        {/* Submit */}
        <div className="my-5 flex flex-row">
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </div>
      </form>
    </>
  );
}
