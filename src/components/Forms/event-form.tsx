import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Event } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import FieldInput from "@/components/FormFields/field-input";
import { repairRequestPatchSchema } from "@/schema/repair-request";

export default function EventForm() {
  const { control, handleSubmit } = useForm<Event>({
    resolver: zodResolver(repairRequestPatchSchema),
    defaultValues: {
      id: "",
      name: "",
      createdBy: "",
      startDate: undefined,
      eventType: "",
      status: undefined
    }
  });

  const onSubmit: SubmitHandler<Event> = async (data) => {
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

  return (
    <>
      <h1 className="mb-3 text-center text-2xl">Add a New Event</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 space-y-3">
          <FieldInput control={control} name="name"></FieldInput>
          <FieldInput control={control} name="createdBy"></FieldInput>
          <FieldInput control={control} name="startDate"></FieldInput>
          <FieldInput control={control} name="eventType"></FieldInput>
          <FieldInput control={control} name="status"></FieldInput>
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
