import { Transition, Popover } from "@headlessui/react";
import { UserResource } from "@clerk/types";
import { useState, Fragment } from "react";
import { UserRole } from "@/types";
import { FaPencil } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { useAuth } from "@/hooks/auth";

interface Props {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  role: UserRole;
  description: string | null | undefined;
}

const updateUserMetadata = async (
  user: UserResource | null | undefined,
  description: string
) => {
  await user?.update({
    unsafeMetadata: {
      description: description
    }
  });
};

export default function ProfilePopover({
  firstName,
  lastName,
  role,
  description
}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [descriptionText, setDescriptionText] = useState(description);
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescriptionText(e.target.value);
  };

  if (firstName === null || firstName === undefined) return null;

  return (
    <Popover className="relative">
      <Popover.Button className="h-12 w-12 right-2 rounded-full bg-slate-600">
        {firstName!.charAt(0).toUpperCase() + lastName!.charAt(0).toUpperCase()}
      </Popover.Button>

      <Popover.Panel className="absolute top-[60px] -right-5 w-80 h-96 rounded-lg bg-white z-10 shadow-custom">
        <div className="flex flex-col">
          {/* avatar */}
          <div className="font-medium text-5xl text-center leading-[110px] relative h-[110px] w-[110px] my-6 mx-auto rounded-full bg-lightAqua-200">
            {firstName!.charAt(0).toUpperCase() +
              lastName!.charAt(0).toUpperCase()}
          </div>

          {/* name and role */}
          <div className="text-center">
            <div className="text-[28px] font-semibold">
              {firstName} {lastName}
            </div>
            <div className="text-[24px] text-slate-400">
              {String(role).charAt(0).toUpperCase() +
                String(role).slice(1).toLowerCase()}
            </div>
          </div>

          {/* description textarea */}
          <div className="relative mx-auto mt-[20px]">
            <textarea
              disabled={!isEdit}
              className="w-[280px] h-[93px] px-2 py-1 outline-none resize-none text-slate-800 bg-white border-lightAqua-200 border-2 rounded-lg"
              onChange={handleChange}
            >
              {description}
            </textarea>
            <button
              className="text-primary-600 absolute bottom-3 right-3"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? (
                <span
                  onClick={async () =>
                    await updateUserMetadata(user, descriptionText ?? "")
                  }
                  className="text-l space-x-1"
                >
                  <FaSave className="inline text-xl" />
                  <span>Save</span>
                </span>
              ) : (
                <span className="text-l space-x-1">
                  <FaPencil className="inline text-xl" />
                  <span>Edit</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
