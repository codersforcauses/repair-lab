import React from "react";
import type { Event, ItemType } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import DropDown from "@/components/FormFields/field-dropdown";
import FieldInput from "@/components/FormFields/field-input";

export default function PrepopulatedEventForm({
  props,
  itemTypes,
  onSubmit
}: {
  props: Event;
  itemTypes: ItemType[];
  onSubmit: SubmitHandler<Event>;
}) {
  const { control, handleSubmit } = useForm<Event>({
    defaultValues: {
      id: props.id,
      name: props.name,
      createdBy: props.createdBy,
      startDate: props.startDate,
      eventType: props.eventType,
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
    <>
      <h1 className="mb-3 text-center text-2xl">Edit an Event</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 space-y-3">
          <FieldInput control={control} name="name"></FieldInput>
          <FieldInput control={control} name="createdBy"></FieldInput>
          <FieldInput control={control} name="startDate"></FieldInput>
          <DropDown
            control={control}
            name="eventType"
            options={itemTypes.map((type) => ({
              id: type.name,
              text: type.name
            }))}
          ></DropDown>
          <DropDown
            control={control}
            name="status"
            options={[
              { id: 0, text: "UPCOMING" },
              { id: 1, text: "ONGOING" },
              { id: 2, text: "COMPLETED" }
            ]}
          ></DropDown>
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
