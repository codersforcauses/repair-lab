import { zodResolver } from "@hookform/resolvers/zod";
import type { Event, ItemType } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import FieldInput from "@/components/FormFields/field-input";
import FieldSingleSelect from "@/components/FormFields/field-single-select";
import FieldTextArea from "@/components/FormFields/field-text-area";
import { updateEventSchema } from "@/schema/event";
import { UpdateEvent } from "@/types";

export default function PrepopulatedEventForm({
  props,
  itemTypes,
  onSubmit
}: {
  props: Event;
  itemTypes: ItemType[];
  onSubmit: SubmitHandler<UpdateEvent>;
}) {
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

  // const onSubmit: SubmitHandler<Event> = async (data) => {
  //   // console.log(JSON.stringify(data));
  //   const response = await fetch(`/api/repair-request`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   if (response.ok) {
  //     alert("Data submitted");
  //   } else {
  //     alert(`Error! ${response.statusText}`);
  //   }
  // };

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
            options={itemTypes.map((type) => ({
              id: type.name,
              text: type.name
            }))}
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
          ></FieldInput>

          <FieldInput
            control={control}
            name="endDate"
            label="End Date"
          ></FieldInput>

          <FieldTextArea
            name="disclaimer"
            label="Disclaimer"
            placeholder="Enter a disclaimer for the event"
            control={control}
            rules={{ required: false }}
          />

          <FieldInput
            control={control}
            name="name"
            label="Event Name"
          ></FieldInput>

          <FieldInput
            control={control}
            name="eventType"
            label="Event Type"
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
