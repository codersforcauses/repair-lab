// Terms and Conditions Pop-up

import React, { ReactNode, useState } from "react";
import { Inter } from "next/font/google";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

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

  function PopUp({
    trigger,
    children
  }: {
    trigger: boolean;
    children: ReactNode;
  }) {
    return trigger ? (
      <div className="popup justify-item-center fixed inset-2 z-50 flex h-auto overflow-auto rounded-md border border-solid">
        <div className="popup-inner overflow-auto bg-primary-200 bg-opacity-100">
          <button
            className="close-btnh w-20 border-spacing-0.5 rounded-md border border-solid text-center text-lg mb-4"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
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
        <label htmlFor="tncAccepted">
          <div className="relative h-6 justify-center">
            <Controller
              control={control}
              name="tncAccepted"
              rules={{ required: "*Please refer to the terms and conditions." }}
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
            <span className="pl-3">
              I accept the{" "}
              <button
                className="text-darkAqua-400"
                onClick={handleshowPopupChange}
              >
                {" "}
                Terms and Conditions{" "}
              </button>
              .
            </span>

            {showPopup && (
              <PopUp trigger={showPopup}>
                <p>
                  <h1 className="text-primary-600 text-center pl-5 pr-8 mb-4">
                      *Please check the checkbox to acknowledge that you have
                      read and accept our House Rules.* </h1>

                  <h1 className="text-center text-lg font-bold mb-4">
                    {" "}
                    House Rules:{" "}
                  </h1>
                  <ol className="tlex grid list-decimal justify-center gap-y-4 pl-10 pr-10">
                    <li>
                      Workshop participants carry out the repair themselves
                      whenever possible, and repair volunteers are on site to
                      help or provide advice, if necessary.
                    </li>
                    <li>
                      The work carried out in Repair Lab by repair volunteers is
                      performed free of charge on a voluntary basis.
                    </li>
                    <li>
                      The fact that the repairs are being performed by unpaid
                      volunteers reflects the allocation of risks and limitation
                      of liability: neither the organisers of Repair Lab nor the
                      repair volunteers are liable:
                      <ol className="list-disc">
                        <li>
                          for any loss that may result from advice or
                          instructions concerning repairs,
                        </li>
                        <li>for the loss of items handed over for repair,</li>
                        <li>for indirect or consequential loss,</li>
                        <li>
                          for any other kind of loss resulting from work
                          performed at Repair Lab.
                        </li>
                      </ol>
                    </li>
                    <li>
                      A voluntary donation is always appreciated, to help fund
                      future Repair Labs.
                    </li>
                    <li>
                      Any use of new materials such as leads, plugs, fuses, etc.
                      will be paid for separately.
                    </li>
                    <li>
                      Visitors offering broken items for repair do so at their
                      own risk.
                    </li>
                    <li>
                      Volunteer Mending Mentors offer no guarantee for the
                      repairs carried out with their help and are not liable if
                      objects that are repaired at Repair Lab turn out not to
                      work properly at home.
                    </li>
                    <li>
                      Repair Volunteers are entitled to refuse to repair certain
                      objects.
                    </li>
                    <li>
                      Repair Volunteers are not obliged to reassemble
                      disassembled appliances that cannot be repaired.
                    </li>
                    <li>
                      Participants at Repair Lab are solely responsible for the
                      tidy removal of broken objects that could not be repaired.
                    </li>
                    <li>
                      Photographs or videos are taken during repair sessions and
                      may be used for online or in-print news and promotional
                      materials. If you do not wish to have your photograph
                      used, please advise the volunteer taking the photos or the
                      organizers.
                    </li>
                  </ol>
                </p>
              </PopUp>
            )}

            {errors.tncAccepted && (
              <p className="text-red-600 mt-2">
                {" "}
                {errors.tncAccepted.message}{" "}
              </p>
            )}
          </div>
        </label>

        <br></br>

        <input
          className={`text-white hover:bg-teal-500 m-auto mt-2 flex h-12 w-40 border-spacing-0.5 justify-center self-center rounded-md border border-solid bg-lightAqua-400 text-center  text-lg ${
            errors.tncAccepted && "mt-16"
          }`}
          type="submit"
        />
      </form>
    </main>
  );
};

export default Home;
