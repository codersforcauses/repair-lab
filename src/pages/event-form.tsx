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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="eventName"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Event Name" />}
      />
      <Controller
        name="location"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Location" />}
      />
      <Controller
        name="dateRange"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Date Range" type="date" />
        )}
      />
      <Controller
        name="status"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select {...field} label="Status">
            <MenuItem value="ongoing">Ongoing</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            {/* ... other status options */}
          </Select>
        )}
      />
      <Controller
        name="assignedVolunteers"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Select {...field} label="Assigned Volunteers" multiple>
            <MenuItem value="volunteer1">Volunteer 1</MenuItem>
            <MenuItem value="volunteer2">Volunteer 2</MenuItem>
            <MenuItem value="volunteer3">Volunteer 3</MenuItem>
            {/* Other volunteer options */}
          </Select>
        )}
      />
      <Controller
        name="otherInfo"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Other Information" />
        )}
      />
      <Button type="submit">Create Event</Button>
    </form>
  );
}
