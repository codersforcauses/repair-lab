// Terms and Conditions Pop-up

import React, { useState, ReactNode } from "react";
import { Inter } from "next/font/google";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

const inter = Inter({ subsets: ["latin"] });

type FormValues = {
  tncAccepted: false;
};

const Home = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      tncAccepted: false
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const response = await fetch(`/api/repair-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };

  function PopUp({ trigger, children }: { trigger: boolean; children: ReactNode }) {
    return trigger ? (
      <div className="popup">
        <div className="popup-inner">
          <button className="close-btn">Close</button>
          {children}
        </div>
      </div>
    ) : null;
  }

  const [showPopup, setShowPopup] = useState(false);
  const handleshowPopupChange = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowPopup((prevState) => !prevState);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-6 items-center">
          <Controller
            control={control}
            name="tncAccepted"
            rules={{ required: "*Accept terms and conditions to submit." }}
            render={({ field: { value, onChange } }) => (
              <input
                className={`${
                  errors.tncAccepted &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500"
                }`}
                type="checkbox"
                checked={value}
                onChange={(e) => {
                  onChange(e.target.checked);
                }}
              />
            )}
          />
          <button onClick={handleshowPopupChange}>
            {" "}
            I accept the Terms and Conditions.{" "}
          </button>

          {showPopup && (
            <PopUp trigger={showPopup}>
              <p>hi</p>
            </PopUp>
          )}

          {errors.tncAccepted && (
            <p className="text-red-600"> {errors.tncAccepted.message} </p>
          )}
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
