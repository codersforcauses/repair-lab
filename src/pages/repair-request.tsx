// Page for submitting a repair request

import { ChangeEvent, useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

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
      className={`flex min-h-screen flex-col items-center ${inter.className}`}
    >
      <br></br>

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

      <br></br>

      {/* Heading of the Page */}

      <h1 className="text-xl font-bold"> Submit a Repair Request</h1>

      <br></br>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <br></br>

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

          <br></br>

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
          <br></br>

          {/* Input field for Images */}
          <div>
            <label htmlFor="description">Image:</label>
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
          <br></br>

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
                <option value="1">Event 1</option>
                <option value="2">Event 2</option>
                <option value="3">Event 3</option>
              </select>
            </div>
            <p className="text-red-600"> {errors.eventId?.message} </p>
          </div>

          <br></br>

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
          <br></br>

          <input
            className="bg-teal-600 text-white hover:bg-teal-500 m-auto flex h-12 w-60 border-spacing-0.5 justify-center self-center rounded-md border border-solid text-center text-lg"
            type="submit"
          />
        </form>
      </div>
    </main>
  );
};

export default Home;
