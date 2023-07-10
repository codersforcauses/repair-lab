import { MenuItem, Select } from "@material-ui/core"; // To be replaced by i36 dropdown component
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Button from "../components/Button/index";

type FormData = {
  eventName: string;
  location: string;
  dateTime: string;
  eventStatus: string;
  assignedVolunteers: string[];
  sparePartsNeeded: boolean;
  partNeeded?: string;
  eventSummary: string;
};
export default function EventForm() {
  const { handleSubmit, control } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch(`/api/event`, {
      // To work on /api/event.ts
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventName: data.eventName,
        location: data.location,
        dateTime: data.dateTime,
        eventStatus: data.eventStatus,
        assignedVolunteers: data.assignedVolunteers,
        sparePartsNeeded: data.sparePartsNeeded,
        partNeeded: data.partNeeded,
        eventSummary: data.eventSummary
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
      <div className="mb-5 bg-slate-300 px-3 py-4">
        <h1 className="text-xl font-bold">Create New Event</h1>
      </div>
      <div className="container mx-auto px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="eventName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="relative mb-4">
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
                  placeholder="Repair event"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}
          />
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Controller
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
                      placeholder="Location"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                name="dateTime"
                control={control}
                defaultValue=""
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
              />
            </div>
          </div>
          <Controller
            name="eventStatus"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="relative mb-4">
                <label
                  htmlFor="eventStatus"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  Event Status <span className="text-red-500">*</span>
                </label>
                {/* The label overlaps the border of the select component - to be fixed after importing the i36 dropdown component. */}
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
              <div className="relative mb-4">
                <label
                  htmlFor="assignedVolunteers"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  Volunteer(s) <span className="text-red-500">*</span>
                </label>
                {/* The label overlaps the border of the select component - to be fixed after importing the i36 dropdown component. */}
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
          <div className="mb-3 grid grid-cols-2 gap-4">
            <div>
              <Controller
                name="sparePartsNeeded"
                control={control}
                render={({ field }) => (
                  <div className="relative mb-2">
                    <label
                      htmlFor="sparePartsNeeded"
                      className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                    >
                      Spare parts needed?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    {/* The label overlaps the border of the select component - to be fixed after importing the i36 dropdown component. */}
                    <Select
                      {...field}
                      id="sparePartsNeeded"
                      className="w-full rounded-md border border-gray-300 pb-1 pl-3 pr-2 pt-1 focus:border-blue-500 focus:outline-none"
                    >
                      <MenuItem value="Y">Y</MenuItem>
                      <MenuItem value="N">N</MenuItem>
                    </Select>
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                name="partNeeded"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div className="relative mb-2">
                    <label
                      htmlFor="partNeeded"
                      className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                    >
                      Part needed
                    </label>
                    <input
                      id="partNeeded"
                      type="text"
                      {...field}
                      placeholder="Part"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                )}
              />
            </div>
          </div>
          <Controller
            name="eventSummary"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="relative mb-4">
                <label
                  htmlFor="eventSummary"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  Event Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="eventSummary"
                  type="text"
                  {...field}
                  placeholder="......"
                  className="h-20 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}
          />
          <div className="text-right">
            <Button
              type="submit"
              height="h-8"
              width="w-1/6"
              color="bg-primary-600"
              textColor="text-white"
              radius="rounded-md"
              className="px-4 py-2"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
