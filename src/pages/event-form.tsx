import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
/* import { MenuItem, Select } from "@material-ui/core"; // To be replaced by i27 select component */
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";

import FieldInput from "@/components/Form Fields/field-input";
import { useItemTypes } from "@/hooks/item-types";

import Button from "../components/Button/index";

type FormData = {
  eventId: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  eventType: string;
  volunteers: string[];
};
export default function EventForm() {
  const { handleSubmit, control } = useForm<FormData>();
  const router = useRouter();
  const itemTypeList = useItemTypes();

  const [itemType, setItemType] = useState("");

  const handleItemTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemType(event.target.value);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch(`/api/event-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        eventType: data.eventType,
        volunteers: data.volunteers
      })
    });

    if (response.ok) {
      alert("Event saved");
    } else {
      alert(`Error! ${response.statusText}`);
    }
  };

  return (
    <div>
      <div className="mb-2 grid grid-cols-2">
        <div className="mb-8 bg-lightAqua-300 px-6 py-4">
          <h1 className="text-xl font-bold">Create New Event</h1>
        </div>
        <div className="mb-8 bg-lightAqua-300 px-6 py-4 text-right">
          <Button
            color="bg-lightAqua-300"
            textColor="text-black"
            height="h-8"
            width="w-8"
            onClick={() => router.push("./")}
          >
            <GrClose />
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <FieldInput
              name="name"
              label="Event Name"
              control={control}
              rules={{ required: "Name required" }}
              placeholder="General repairs, fashion repairs, etc."
            />
          </div>
          <div className="mb-6">
            <FieldInput
              name="location"
              label="Location"
              control={control}
              rules={{ required: "Location required" }}
              placeholder="UWA, education centre, etc."
            />
          </div>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <FieldInput
                name="startDate"
                type="datetime-local"
                label="Start Date & Time"
                control={control}
                rules={{ required: "Date and time required" }}
              />
            </div>
            <div>
              <FieldInput
                name="endDate"
                type="datetime-local"
                label="End Date & Time"
                control={control}
                rules={{ required: "Date and time required" }}
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="eventType">
              Event Type <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <select
                id="eventType"
                className="h-10 w-80 border-spacing-0.5 rounded-md border border-solid pl-3"
                value={itemType}
                onChange={handleItemTypeChange}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                {itemTypeList.map((itemType: string, index: number) => {
                  return <option key={index}>{itemType}</option>;
                })}
              </select>
            </div>
          </div>
          <Controller
            name="volunteers"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div className="relative mb-6">
                <label
                  htmlFor="volunteers"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  Volunteer(s) <span className="text-red-500">*</span>
                </label>
                <select
                  {...field}
                  id="volunteers"
                  multiple
                  className="w-full rounded-md border border-gray-300 pb-1 pl-3 pr-2 pt-1  focus:border-blue-500 focus:outline-none"
                >
                  <option value="volunteer1">Volunteer 1</option>
                  <option value="volunteer2">Volunteer 2</option>
                  <option value="volunteer3">Volunteer 3</option>
                </select>
              </div>
            )}
          />
          <div className="text-right">
            <Button height="h-11" width="w-1/6" radius="rounded-md">
              Save Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
