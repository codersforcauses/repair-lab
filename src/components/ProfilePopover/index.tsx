import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { UserRole } from "@/types";
import { FaPencil } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";

interface Props {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  role: UserRole;
  description: string | null | undefined;
}

export default function ProfilePopover({
  firstName,
  lastName,
  role,
  description
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="fixed top-10 right-6">
      <button
        className="relative h-12 w-12 rounded-full bg-slate-600"
        onClick={() => setIsOpen(true)}
      >
        EX
      </button>

      <div className="w-[200px] absolute">
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="absolute top-28 right-[10px] w-[330px] h-[373px] rounded-lg bg-white z-10 shadow-custom"
        >
          <div className="flex flex-col">
            {/* avatar */}
            <div className="font-medium text-5xl text-center leading-[110px] relative h-[110px] w-[110px] mt-[20px] mx-auto rounded-full bg-lightAqua-200">
              EX
            </div>

            {/* name and role */}
            <div className="text-center mt-[20px]">
              <div className="text-[28px] font-semibold">
                {firstName} {lastName}
              </div>
              <div className="text-[24px] text-slate-400">
                {String(role).charAt(0).toUpperCase() +
                  String(role).slice(1).toLowerCase()}
              </div>
            </div>

            {/* description textarea */}
            <div className="mx-auto mt-[20px] w-[280px] px-2 py-1 h-[93px] border-lightAqua-200 border-2 rounded-lg">
              <textarea
                disabled={!isEdit}
                className="w-full h-full outline-none resize-none text-slate-800 rounded-lg bg-white"
              >
                {description ? description : ""}
              </textarea>
              <span className="text-primary-600 absolute bottom-10 right-9">
                <button onClick={() => setIsEdit(!isEdit)}>
                  {isEdit ? <FaSave /> : <FaPencil />}
                </button>
              </span>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
