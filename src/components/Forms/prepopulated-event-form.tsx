import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import FieldInput from "@/components/FormFields/field-input";
import FieldSingleSelect from "@/components/FormFields/field-single-select";
import FieldTextArea from "@/components/FormFields/field-text-area";
import { toDatetimeLocalString } from "@/components/utils/format-date";
import { ItemType, useItemTypes } from "@/hooks/item-types";
import { updateEventSchema } from "@/schema/event";
import { Event } from "@/types";
import { UpdateEvent } from "@/types";

export default function PrepopulatedEventForm({
  props,
  onSubmit
}: {
  props: Event;
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
      startDate: toDatetimeLocalString(props.startDate),
      endDate: toDatetimeLocalString(props.endDate),
      status: props.status
    }
  });

  return (
    <div>
      <h1 className="mb-3 text-center text-2xl">Edit an Event</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 space-y-3">
          <FieldInput
            control={control}
            name="name"
            label="Event Name"
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
            rules={{ required: false }}
          />

          <FieldInput
            control={control}
            name="location"
            label="Location"
          ></FieldInput>

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
          />

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
    </div>
  );
}
