// Page for submitting a repair request

import { Inter } from "next/font/google";
import { useForm } from "react-hook-form";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      item_brand: "",
      item_type: "",
      description: "",
      images: [],
      event: ""
    }
  });

  console.log(errors);

  return (
    <main
      className={`flex min-h-screen flex-col items-center ${inter.className}`}
    >
      <br></br>

      {/* Logo of Repair Lab, which links to the main website. */}

      <picture>
        <a href="https://repairlab.myfreesites.net/" target="_blank">
          <img
            src="/images/repair_lab_logo.jpg"
            alt="Repair Labs Logo"
            width={80}
          />
        </a>
      </picture>

      <br></br>

      {/* Heading of the Page */}

      <h1 className="text-xl font-bold"> Submit a Repair Request</h1>

      <br></br>

      <div>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);

            const formData = new FormData();
            formData.append("item_brand", data.item_brand);
            formData.append("item_type", data.item_type);
            formData.append("description", data.description);

            if (data.images && data.images.length) {
              formData.append("images", data.images[0]);
            }
          })}
        >
          {/* Input field for Brand of Item */}

          <input
            className={`h-10 w-80 border-spacing-0.5 rounded-md border border-solid pl-3 ${
              errors.item_brand &&
              "border-red-500 focus:border-red-500 focus:ring-red-500"
            } `}
            {...register("item_brand", { required: "*Required" })}
            placeholder="Brand"
          />

          <p className="text-red-600"> {errors.item_brand?.message} </p>

          <br></br>

          {/* Input field for Item Type */}

          <div>
            <select
              className={`h-10 w-80 border-spacing-0.5 rounded-md border border-solid p-2 pl-2 pr-3 ${
                errors.item_type &&
                "border-red-500 focus:border-red-500 focus:ring-red-500"
              }`}
              {...register("item_type", {
                required: "*Please select an option."
              })}
            >
              <option value="" disabled selected hidden>
                Item Type
              </option>
              <option value="clothing"> General </option>
              <option value="electrical"> Electrical </option>
              <option value="jewellery"> Jewellery </option>
              <option value="bike_repairs"> Bike Repairs </option>
              <option value="fashion_repairs"> Fashion Repairs </option>
              <option value="others"> Others </option>
            </select>

            <p className="text-red-600"> {errors.item_type?.message} </p>
          </div>

          <br></br>

          {/* Input field for Description of Item */}

          <input
            className={`h-10 w-80 border-spacing-0.5 rounded-md border border-solid pl-3 ${
              errors.description &&
              "border-red-500 focus:border-red-500 focus:ring-red-500"
            }`}
            {...register("description", { required: "*Required" })}
            placeholder="Description of Item"
          />

          <p className="text-red-600"> {errors.description?.message} </p>

          <br></br>

          {/* Input field for Images */}

          <input
            className={`h-36 w-80 border-spacing-0.5 justify-center rounded-md border border-solid p-10 ${
              errors.images &&
              "border-red-500 focus:border-red-500 focus:ring-red-500"
            }`}
            type="file"
            {...register("images", { required: "*Required" })}
          />

          <p className="text-red-600"> {errors.images?.message} </p>

          <br></br>

          {/* Input field for Event Date */}

          <div>
            <select
              className={`h-10 w-80 border-spacing-0.5 rounded-md border border-solid p-2 pl-2 pr-3 ${
                errors.event &&
                "border-red-500 focus:border-red-500 focus:ring-red-500"
              }`}
              {...register("event", {
                required: "*Please select an event."
              })}
            >
              <option value="" disabled selected hidden>
                Event
              </option>
              <option value=""> Placeholder: Event Option 1 </option>
              <option value=""> Placeholder: Event Option 2 </option>
              <option value=""> Others </option>
            </select>

            <p className="text-red-600"> {errors.event?.message} </p>
          </div>

          <br></br>

          <label className="flex h-6 items-center">
            <input type="checkbox" />
            <span className="pl-2 text-sm">
              {" "}
              I accept the Terms and Conditions.
            </span>
          </label>

          <br></br>

          <input
            className="m-auto flex h-12 w-60 border-spacing-0.5 justify-center self-center rounded-md border border-solid bg-teal-600 text-center text-lg text-white hover:bg-teal-500"
            type="submit"
          />
        </form>
      </div>
    </main>
  );
}
