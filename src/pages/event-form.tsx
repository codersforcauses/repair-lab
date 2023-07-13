import { useRouter } from "next/router";
import { MenuItem, Select } from "@material-ui/core"; // To be replaced by i27 select component
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BsXCircle } from "react-icons/bs";

import FieldInput from "@/components/Form Fields/field-input";

import Button from "../components/Button/index";

type FormData = {
  eventName: string;
  location: string;
  dateTime: Date; // or string?
  eventStatus: string;
  assignedVolunteers: string[];
};
export default function EventForm() {
  const { handleSubmit, control } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch(`/api/event-form`, {
      // To work on /api/event-form.ts & services & schema
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventName: data.eventName,
        location: data.location,
        dateTime: data.dateTime,
        eventStatus: data.eventStatus,
        assignedVolunteers: data.assignedVolunteers
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
            <BsXCircle className="text-black hover:text-gray-600 " />
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <Controller
            name="eventName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="relative mb-6">
                <label
                  htmlFor="eventName"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  Event Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="eventName"
                  type="text"
                  {...field}
                  placeholder="General repairs, fashion repairs, etc."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}
          /> */}
          <div className="mb-6">
            <FieldInput
              name="eventName"
              label="Event Name"
              control={control}
              rules={{ required: "Name required" }}
              placeholder="General repairs, fashion repairs, etc."
            />
          </div>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              {/* <Controller
                name="location"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div className="relative">
                    <label
                      htmlFor="location"
                      className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                    >
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="location"
                      type="text"
                      {...field}
                      placeholder="UWA, education centre, etc."
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                )}
              /> */}
              <FieldInput
                name="location"
                label="Location"
                control={control}
                rules={{ required: "Location required" }}
                placeholder="UWA, education centre, etc."
              />
            </div>
            <div>
              {/* <Controller
                name="dateTime"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <label
                      htmlFor="dateTime"
                      className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                    >
                      Date - Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="dateTime"
                      type="datetime-local"
                      {...field}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                )}
              /> */}
              <FieldInput
                name="dateTime"
                type="datetime-local"
                label="Date - Time"
                control={control}
                rules={{ required: "Date and time required" }}
              />
            </div>
          </div>
          <Controller
            name="eventStatus"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="relative mb-6">
                <label
                  htmlFor="eventStatus"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  Event Status <span className="text-red-500">*</span>
                </label>
                {/* The label overlaps the border of the select component - to be fixed after importing the i27 select component. */}
                <Select
                  {...field}
                  id="eventStatus"
                  className="w-full rounded-md border border-gray-300 pb-1 pl-3 pr-2 pt-1  focus:border-blue-500 focus:outline-none"
                >
                  <MenuItem value="ongoing">Ongoing</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  {/* ... other status options */}
                </Select>
              </div>
            )}
          />
          <Controller
            name="assignedVolunteers"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div className="relative mb-6">
                <label
                  htmlFor="assignedVolunteers"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  Volunteer(s) <span className="text-red-500">*</span>
                </label>
                {/* The label overlaps the border of the select component - to be fixed after importing the i27 select component. */}
                <Select
                  {...field}
                  id="assignedVolunteers"
                  multiple
                  className="w-full rounded-md border border-gray-300 pb-1 pl-3 pr-2 pt-1  focus:border-blue-500 focus:outline-none"
                >
                  <MenuItem value="volunteer1">Volunteer 1</MenuItem>
                  <MenuItem value="volunteer2">Volunteer 2</MenuItem>
                  <MenuItem value="volunteer3">Volunteer 3</MenuItem>
                  {/* Other volunteer options */}
                </Select>
              </div>
            )}
          />
          <div className="text-right">
            <Button height="h-8" width="w-1/5" radius="rounded-md">
              Save Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
