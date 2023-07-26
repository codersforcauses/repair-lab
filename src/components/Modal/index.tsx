// reusable modal component

import { Dispatch, Fragment, ReactNode, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsXCircle } from "react-icons/bs";

type ModalProps = {
  showModal: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  title?: string;
  width?: string;
  height?: string;
  children?: ReactNode;
};

const Modal = ({
  showModal,
  setShowPopup,
  title,
  width = "w-full sm:max-w-lg md:max-w-2xl",
  height = "h-full",
  children
}: ModalProps) => {
  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          open={showModal}
          onClose={() => setShowPopup(false)}
        >
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
                <Dialog.Panel
                  className={`${width} ${height} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  {title ? (
                    <Dialog.Title
                      as="h3"
                      className="mt-0 border-b border-lightAqua-300 p-5 text-center text-2xl font-medium leading-6"
                    >
                      {title}
                    </Dialog.Title>
                  ) : (
                    ""
                  )}

                  <div>{children}</div>

                  <button
                    onClick={() => setShowPopup(false)}
                    className="absolute right-2 top-2 rounded-lg p-1 hover:bg-gray-50"
                  >
                    <BsXCircle className="text-lightAqua-300 hover:text-gray-600" />
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
