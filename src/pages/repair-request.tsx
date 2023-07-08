// Page for submitting a repair request

import { ChangeEvent, useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useBrands } from "@/hooks/brands";
import { useItemTypes } from "@/hooks/item-types";

const inter = Inter({ subsets: ["latin"] });

type FormValues = {
  itemBrand: string;
  itemType: string;
  description: string;
  images: [];
  eventId: string;
  tncAccepted: false;
};

const Home = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
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

  // Brand dropdown
  const [brand, setBrand] = useState("");
  const handleBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBrand(event.target.value);
  };

  // Item Types Dropdown
  const [itemType, setItemType] = useState("");
  const handleItemTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemType(event.target.value);
  };

  // Events Dropdown
  const [event, setEvent] = useState("");
  const handleEventChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEvent(event.target.value);
  };

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
          <div>
            <label htmlFor="brand">Brand:</label>
            <div className="flex">
              <select
                id="brand"
                className={`h-10 w-80 border-spacing-0.5 rounded-md border border-solid pl-3 ${
                  errors.itemBrand &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500"
                } `}
                {...register("itemBrand", {
                  required: "*Please select an option."
                })}
                placeholder="Brand"
                value={brand}
                onChange={handleBrandChange}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                {brandList.map((brand: string, index: number) => {
                  return <option key={index}>{brand}</option>;
                })}
              </select>
            </div>
            <p className="text-red-600"> {errors.itemBrand?.message} </p>
          </div>

          {/* Input field for Item Type */}
          <div>
            <label htmlFor="itemType">Item Type:</label>
            <div className="flex">
              <select
                id="itemType"
                className={`h-10 w-80 border-spacing-0.5 rounded-md border border-solid pl-3 ${
                  errors.itemType &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500"
                } `}
                {...register("itemType", {
                  required: "*Please select an option."
                })}
                placeholder="ItemType"
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
            <p className="text-red-600"> {errors.itemType?.message} </p>
          </div>

          {/* Input field for Description of Item */}
          <div>
            <label htmlFor="description">Item Description:</label>
            <div className="flex">
              <textarea
                id="description"
                className={`h-20 w-80 border-spacing-0.5 rounded-md border border-solid pl-3 ${
                  errors.description &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500"
                }`}
                {...register("description", { required: "*Required" })}
                placeholder="Description of Item"
              />
            </div>
            <p className="text-red-600"> {errors.description?.message} </p>
          </div>

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
          <div>
            <label htmlFor="event">Event:</label>
            <div className="flex">
              <select
                id="event"
                className={`h-10 w-80 border-spacing-0.5 rounded-md border border-solid pl-3 ${
                  errors.eventId &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500"
                } `}
                {...register("eventId", {
                  required: "*Please select an option."
                })}
                placeholder="Event"
                value={event}
                onChange={handleEventChange}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="6b3e0cca-d636-472d-8c6e-1cc63bde6ceb">
                  Evans&apos; Repair Warehouse
                </option>
                <option value="a6a73c2e-7937-4705-8a40-d6399c69f3bc">
                  Can Bob Fix It?
                </option>
              </select>
            </div>
            <p className="text-red-600"> {errors.eventId?.message} </p>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="h-6 items-center">
            <Controller
              control={control}
              name="tncAccepted"
              render={({ field: { value, onChange } }) => (
                <input
                  className={`${
                    errors.tncAccepted &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500"
                  }`}
                  type="checkbox"
                  checked={value}
                  {...register("tncAccepted", {
                    required: "*Accept terms and conditions to submit."
                  })}
                  onChange={(e) => {
                    onChange(e.target.checked);
                  }}
                />
              )}
            />
            <span className="pl-2 text-sm">
              I accept the Terms and Conditions.
            </span>
            <p className="text-red-600"> {errors.tncAccepted?.message} </p>
          </div>

          {/* <input
            className="m-auto flex h-12 w-60 border-spacing-0.5 justify-center self-center rounded-md border border-solid bg-teal-600 text-center text-lg text-white hover:bg-teal-500"
            type="submit"
          /> */}
          <Button> Submit</Button>
        </form>
      </div>
    </main>
  );
};

export default Home;
