// Terms and Conditions Pop-up

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";

type FormValues = {
  tncAccepted: boolean;
};

const TermsAndConditions = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      tncAccepted: false
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await fetch(`/api/repair-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };

  const [showPopup, setShowPopup] = useState(false);
  const handleshowPopupChange = () => {
    setShowPopup((prevState) => !prevState);
  };

  return (
    <>
      <div className="static flex justify-center">
        <label htmlFor="tncAccepted">
          <div className="relative h-6 justify-center">
            <Controller
              control={control}
              name="tncAccepted"
              rules={{
                required: "*Please refer to the terms and conditions."
              }}
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

            <span className="pl-3">I have read and accept the</span>
            <button
              type="button"
              onClick={handleshowPopupChange}
              className="pl-1.5 text-darkAqua-400 hover:text-darkAqua-200"
            >
              house rules
            </button>
            <span>.</span>
          </div>
        </label>
      </div>

      <Transition appear show={showPopup} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowPopup}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 h-auto overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-auto max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="border-b p-5 text-center text-2xl font-medium leading-6 text-gray-900"
                  >
                    House Rules
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-m text-gray-500">
                      <p className="m-6 gap-y-4 pl-10 pr-10 text-center text-red-600">
                        *Note: Please check the checkbox to acknowledge that you
                        have read and accept our House Rules.*{" "}
                      </p>

                      <ol className="tlex grid list-decimal justify-center gap-y-4 pl-10 pr-10">
                        <li>
                          Workshop participants carry out the repair themselves
                          whenever possible, and repair volunteers are on site
                          to help or provide advice, if necessary.
                        </li>
                        <li>
                          The work carried out in Repair Lab by repair
                          volunteers is performed free of charge on a voluntary
                          basis.
                        </li>
                        <li>
                          The fact that the repairs are being performed by
                          unpaid volunteers reflects the allocation of risks and
                          limitation of liability: neither the organisers of
                          Repair Lab nor the repair volunteers are liable:
                          <ol className="list-disc">
                            <li>
                              for any loss that may result from advice or
                              instructions concerning repairs,
                            </li>
                            <li>
                              for the loss of items handed over for repair,
                            </li>
                            <li>for indirect or consequential loss,</li>
                            <li>
                              for any other kind of loss resulting from work
                              performed at Repair Lab.
                            </li>
                          </ol>
                        </li>
                        <li>
                          A voluntary donation is always appreciated, to help
                          fund future Repair Labs.
                        </li>
                        <li>
                          Any use of new materials such as leads, plugs, fuses,
                          etc. will be paid for separately.
                        </li>
                        <li>
                          Visitors offering broken items for repair do so at
                          their own risk.
                        </li>
                        <li>
                          Volunteer Mending Mentors offer no guarantee for the
                          repairs carried out with their help and are not liable
                          if objects that are repaired at Repair Lab turn out
                          not to work properly at home.
                        </li>
                        <li>
                          Repair Volunteers are entitled to refuse to repair
                          certain objects.
                        </li>
                        <li>
                          Repair Volunteers are not obliged to reassemble
                          disassembled appliances that cannot be repaired.
                        </li>
                        <li>
                          Participants at Repair Lab are solely responsible for
                          the tidy removal of broken objects that could not be
                          repaired.
                        </li>
                        <li>
                          Photographs or videos are taken during repair sessions
                          and may be used for online or in-print news and
                          promotional materials. If you do not wish to have your
                          photograph used, please advise the volunteer taking
                          the photos or the organizers.
                        </li>
                      </ol>
                    </p>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Button onClick={handleshowPopupChange}>Close</Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TermsAndConditions;
