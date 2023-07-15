// reusable modal component

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsXCircle } from "react-icons/bs";

import Button from "@/components/Button";

const Modal = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handleshowPopupChange = () => {
    setShowPopup((prevState) => !prevState);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <span className="pl-3"></span>
        <button
          type="button"
          onClick={handleshowPopupChange}
          className="rounded-md border border-darkAqua-400 bg-darkAqua-400 p-2 pl-1.5 text-black hover:bg-darkAqua-200"
        >
          Modal Demo
        </button>
        <span></span>
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
            <div className="fixed inset-0 bg-grey-950 opacity-20" />
          </Transition.Child>

          <div className="fixed inset-0 h-full overflow-y-auto">
            <div className="flex h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#FFFFFF] p-6 text-left align-middle shadow-xl transition-all sm:max-w-lg md:max-w-2xl">
                  {/* <div className="text-gray-300 p-5 text-center text-2xl font-medium leading-6"></div> */}
                  <Dialog.Title
                    as="h3"
                    className="mt-0 border-b border-lightAqua-300 p-5 text-center text-2xl font-medium leading-6"
                  >
                    Modal Demo
                  </Dialog.Title>

                  <div className="mt-2">
                    <p className="text-m text-gray-500">
                      <p className="m-6 gap-y-4 pl-10 pr-10 text-center text-xl font-bold text-red-600">
                        *Notice:......*{" "}
                      </p>

                      <ol className="pl-full grid list-decimal justify-center gap-y-4 pr-10">
                        <li>Demo.........</li>
                        <li>Demo.........</li>
                      </ol>
                    </p>
                  </div>
                  <div className="md-1 mt-5 border-b border-lightAqua-300 p-5 text-center text-2xl font-medium leading-6"></div>

                  <div className="md-1 mt-5 flex justify-end">
                    <Button onClick={handleshowPopupChange} width="w-1/4">
                      Submit
                    </Button>
                  </div>

                  <button
                    onClick={handleshowPopupChange}
                    className="absolute right-2 top-2 rounded-lg p-1 hover:bg-gray-50"
                  >
                    <BsXCircle className="text-lightAqua-300 hover:text-gray-600 " />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
