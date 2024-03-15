import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SlLocationPin } from "react-icons/sl";

import Button from "@/components/Button";
import FieldInput from "@/components/FormFields/CommonFields/field-input";
import FieldSingleSelect from "@/components/FormFields/CommonFields/field-single-select";
import FieldTextArea from "@/components/FormFields/CommonFields/field-text-area";
import { ItemType, useItemTypes } from "@/hooks/item-types";
import { updateEventSchema } from "@/schema/event";
import { EventResponse } from "@/types";
import { UpdateEvent } from "@/types";

export default function PrepopulatedEventForm({
  props,
  onSubmit
}: {
  props: EventResponse;
  onSubmit: SubmitHandler<UpdateEvent>;
}) {
  const { data: itemTypes } = useItemTypes();

  const { control, handleSubmit } = useForm<UpdateEvent>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      name: props.name,
      location: props.location,
      description: props.description,
      disclaimer: props.disclaimer,
      eventType: props.eventType,
      startDate: new Date(props.startDate).toISOString(),
      endDate: new Date(props.endDate).toISOString(),
      status: props.status
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2 ">
        <FieldInput
          control={control}
          name="name"
          label="Event Name"
          rules={{ required: true }}
        ></FieldInput>

        <FieldSingleSelect
          control={control}
          name="status"
          label="Status"
          options={[
            { id: "UPCOMING", text: "UPCOMING" },
            { id: "ONGOING", text: "ONGOING" },
            { id: "COMPLETED", text: "COMPLETED" }
          ]}
        ></FieldSingleSelect>

        <FieldInput
          control={control}
          name="location"
          label="Location"
          icon={<SlLocationPin className="mr-3 h-full" />}
        ></FieldInput>

        <FieldSingleSelect
          control={control}
          name="eventType"
          label="Event Type"
          options={
            itemTypes
              ? itemTypes.map((type: ItemType) => ({
                  id: type.name,
                  text: type.name
                }))
              : []
          }
        ></FieldSingleSelect>

        <FieldTextArea
          name="description"
          label="Description"
          placeholder="Enter a description for the event"
          control={control}
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
      </div>
      {/* Submit */}
      <div className="mt-3 flex justify-center">
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </div>
    </form>
  );
}
