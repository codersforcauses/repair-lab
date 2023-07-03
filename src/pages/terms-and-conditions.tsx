// Terms and Conditions Pop-up

import { Inter } from "next/font/google";
import { Controller, useForm } from "react-hook-form";

const inter = Inter({ subsets: ["latin"] });

type FormValues = {
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
      tncAccepted: false
  }
});

return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <form>
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
    </main>
  );
};

export default Home;
