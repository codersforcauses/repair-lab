import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  eventName: string;
  location: string;
  dateRange: string;
  status: string;
  assignedVolunteers: string[];
  otherInfo: string;
};
export default function EventForm() {
  const { handleSubmit, control } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // fetch("your-api-endpoint", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // }).then((response) => {
    //   // handle response
    // });
    alert(`Submitted: ${JSON.stringify(data)}`);
  };

  return (
    <div>
      <div className="bg-lightAqua-200 px-3 py-4 mb-5">
        <h1 className="font-bold text-xl">Create New Event</h1>
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
              <span style={{ color: "red" }}>*</span> Event Name
            </label>
            <input
              id="eventName"
              type="text"
              {...field}
              placeholder="Your Item"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}
      />

        <div className="grid grid-cols-2 gap-4 mb-4">
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
                    <span style={{ color: "red" }}>*</span> Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    {...field}
                    placeholder="Brand name"
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
                    <span style={{ color: "red" }}>*</span>Date-Time
                  </label>
                  <input
                    id="dateTime"
                    type="date"
                    {...field}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}
            />
          </div>
        </div>
        <Controller
          name="eventType"
          control={control}
          defaultValue=""
          render={({ field }) => (
    <div className="relative mb-4">
      <label
        htmlFor="eventType"
        className="block text-black text-sm font-bold bg-white px-1 py-1 mt-2"
      >
        <span style={{ color: "red" }}>*</span> Event Type
      </label>
      <Select
        {...field}
        id="eventType"
        className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:border-blue-500 focus:outline-none"
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
            className="block text-black text-sm font-bold bg-white px-1 py-1 mt-2"
          >
            <span style={{ color: "red" }}>*</span> Volunteers
          </label>
          <Select
            {...field}
            id="assignedVolunteers"
            multiple
            className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:border-blue-500 focus:outline-none"
          >
            <MenuItem value="volunteer1">Volunteer 1</MenuItem>
            <MenuItem value="volunteer2">Volunteer 2</MenuItem>
            <MenuItem value="volunteer3">Volunteer 3</MenuItem>
            {/* Other volunteer options */}
          </Select>
        </div>
      )}
    />
        <div className="text-center">
          <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Create Event
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
}