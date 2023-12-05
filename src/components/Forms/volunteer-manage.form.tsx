import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import { manageVolunteerSchema} from "@/schema/manage-volunteer";
import type { VolunteerManageAttempt } from "@/types";
import FieldMultiSelect from "../FormFields/field-multi-select";

export default function VolunteerManageForm({

  // itemBrands,
  // itemTypes,
  onSubmit
}: {
  // itemBrands?: Brand[];
  // itemTypes?: ItemType[];
  onSubmit?: SubmitHandler<VolunteerManageAttempt>;
}) {
  const {control, handleSubmit } = useForm<VolunteerManageAttempt>({
    resolver: zodResolver(manageVolunteerSchema),
    defaultValues: {
      volunteers:[]
    }
  });

  const defaultOnSubmit: SubmitHandler<VolunteerManageAttempt> = async (data) => { 
    console.log(JSON.stringify(data));
    // const response = await fetch("/api/events", {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // });
    // if (response.ok) { 
    //   alert("Data submitted");
    // } else {
    //   alert(`Error! ${response.statusText}`)
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit ? onSubmit : defaultOnSubmit)}>
      {/* ID, Item */}
      <div className="m-5 flex flex-wrap gap-2 max-[415px]:m-2">
        <FieldMultiSelect 
        name="volunteers"
        label="volunteers"
        control={control}
        rules={{required: true}}
        options={[
          {
            id: 0,
            text: "Option1"
          },
          {
            id: 1,
            text: "Option2"
          },
          {
            id: 2,
            text: "Second"
          },
          {
            id: 3,
            text: "Person"
          },
          {
            id: 4,
            text: "Perosn1"
          },
          {
            id: 5,
            text: "Arrif"
          },
          {
            id: 6,
            text: "Option7"
          },
          {
            id: 7,
            text: "A really really long option for the purpose of testing"
          }
        ]}
        placeholder = "" />
          
      </div>

      {/* Submit */}
      <div className="my-5 flex flex-row">
        <Button
          onClick={handleSubmit(onSubmit ? onSubmit : defaultOnSubmit)}
          height="h-9"
          width="w-1/3"
          textSize="text-base"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
