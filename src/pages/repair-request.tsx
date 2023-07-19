// Page for submitting a repair request

import { Inter } from "next/font/google";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import DropDown from "@/components/FormFields/field-dropdown";
import FieldRadio from "@/components/FormFields/field-radio";
import FieldTextArea from "@/components/FormFields/field-text-area";
import { useBrands } from "@/hooks/brands";
import { useItemTypes } from "@/hooks/item-types";
import { repairRequestPostSchema } from "@/schema/repair-request";
import { RepairRequest } from "@/types";

const inter = Inter({ subsets: ["latin"] });

type FormValues = RepairRequest & {
  tncAccepted: boolean;
};

const Home = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(repairRequestPostSchema),
    defaultValues: {
      itemBrand: "",
      itemType: "",
      description: "",
      images: [],
      eventId: "",
      tncAccepted: false
    }
  });

  const itemTypeList = useItemTypes();
  const brandList = useBrands();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    const response = await fetch(`/api/repair-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventId: data.eventId,
        itemBrand: data.itemBrand,
        itemType: data.itemType,
        description: data.description
      })
    });
    ` `;

    if (response.ok) {
      alert("Data submitted");
    } else {
      alert(`Error! ${response.statusText}`);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-4 ${inter.className}`}
    >
      {/* Logo of Repair Lab, which links to the main website. */}

      <picture>
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

      <h1 className="text-xl font-bold"> Submit a Repair Request</h1>
      <div>
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

          {/* Input field for Images */}
          <div>
            <label htmlFor="image">Image:</label>
            <div className="flex">
              <input
                className={`h-36 w-80 border-spacing-0.5 justify-center rounded-md border border-solid p-10 ${
                  errors.images &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500"
                }`}
                type="file"
                {...register("images", { required: "*Required" })}
              />
            </div>
            <p className="text-red-600"> {errors.images?.message} </p>
          </div>

          {/* Input field for Event Date */}
          <DropDown
            name="eventId"
            control={control}
            placeholder="Select an event"
            label="Event"
            options={[
              {
                id: "6b3e0cca-d636-472d-8c6e-1cc63bde6ceb",
                text: "6b3e0cca-d636-472d-8c6e-1cc63bde6ceb"
              },
              {
                id: "a6a73c2e-7937-4705-8a40-d6399c69f3bc",
                text: "Can Bob Fix It?"
              }
            ]}
          />

          <FieldRadio
            name="tncAccepted"
            label="I accept the Terms and Conditions."
            control={control}
            rules={{ required: true }}
          />

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
    </main>
  );
};

export default Home;
