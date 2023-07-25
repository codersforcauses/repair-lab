// Page for submitting a repair request

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

import Button from "@/components/Button";
import DropDown from "@/components/FormFields/field-dropdown";
import FieldImageUpload from "@/components/FormFields/field-image-upload";
import FieldTextArea from "@/components/FormFields/field-text-area";
import { TermsAndConditions } from "@/components/terms-and-conditions";
import Toast from "@/components/Toast";
import { useBrands } from "@/hooks/brands";
import { useEventOptions } from "@/hooks/events";
import { useItemTypes } from "@/hooks/item-types";
import { repairRequestPostSchema } from "@/schema/repair-request";
import { RepairRequest } from "@/types";

export interface FormValues extends RepairRequest {
  tncAccepted: boolean;
}

const repairRequestFormSchema = repairRequestPostSchema.extend({
  tncAccepted: z.literal(true)
});

const Home = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(repairRequestFormSchema),
    defaultValues: {
      itemBrand: "",
      itemType: "",
      description: "",
      images: [],
      eventId: "",
      comment: "",
      tncAccepted: false
    }
  });

  const itemTypeList = useItemTypes();
  const brandList = useBrands();
  const eventOptions = useEventOptions();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await fetch(`/api/repair-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventId: data.eventId,
        itemBrand: data.itemBrand,
        itemType: data.itemType,
        description: data.description,
        comment: data.comment
      })
    });
    ` `;

    if (response.ok) {
      toast.success("Repair request submitted!");
    } else {
      toast.error(`Error! ${response.statusText}`);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex w-screen flex-col justify-center gap-4 md:w-3/6 lg:w-4/12">
        {/* Logo of Repair Lab, which links to the main website. */}

        <picture className="flex justify-center">
          <a href="https://repairlab.myfreesites.net/" target="_blank">
            <Image
              src="/images/repair_lab_logo.jpg"
              alt="Repair Labs Logo"
              width={80}
              height={80}
            />
          </a>
        </picture>

        {/* Heading of the Page */}

        <h1 className="flex justify-center text-xl font-bold">
          {" "}
          Submit a Repair Request
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Input field for Brand of Item */}

          <DropDown
            name="itemBrand"
            control={control}
            placeholder="Select a brand"
            label="Brand"
            rules={{ required: true }}
            options={brandList.map((brand) => {
              return { id: brand, text: brand };
            })}
          />

          <DropDown
            name="itemType"
            control={control}
            placeholder="Select an item type"
            label="Item Type"
            rules={{ required: true }}
            options={itemTypeList.map((itemType) => {
              return { id: itemType, text: itemType };
            })}
          />

          {/* Input field for Description of Item */}

          <FieldTextArea
            name="description"
            label="Description"
            placeholder="Enter a description"
            control={control}
            rules={{ required: true }}
          />

          <FieldImageUpload multiple name="images" control={control} />

          {/* Input field for Event Date */}
          <DropDown
            name="eventId"
            control={control}
            placeholder="Select an event"
            label="Event"
            options={eventOptions.map((event) => {
              return { id: event.id, text: event.name };
            })}
          />

          <FieldTextArea
            name="comment"
            label="Additional Comment"
            placeholder="Enter additional comments"
            control={control}
            rules={{ required: false }}
          />

          <TermsAndConditions control={control} />

          <Button
            onClick={handleSubmit(onSubmit)}
            height="h-9"
            width="w-full"
            textSize="text-base"
          >
            Submit
          </Button>
        </form>
      </div>
      <Toast position="bottom-center" />
    </div>
  );
};

export default Home;
