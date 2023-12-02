import { Transition, Popover } from "@headlessui/react";
import { UserResource } from "@clerk/types";
import { useState, Fragment } from "react";
import { UserRole } from "@/types";
import { FaPencil } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { useAuth } from "@/hooks/auth";
import Image from "next/image";

interface Props {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  role: UserRole;
  description: string | null | undefined;
}

const colors = [
  "#ffc857",
  "#e9724c",
  "#c5283d",
  "#481d24",
  "#255f85",
  "#edffec",
  "#61e786",
  "#5a5766",
  "#48435c",
  "#9792e3"
] as const;

const generateRandomAvatarUrl = (
  firstName: string | null | undefined,
  lastName: string | null | undefined
) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `https://ui-avatars.com/api/?background=
  ${randomColor}&color=random&name=
  ${firstName!.charAt(0)}+${lastName!.charAt(0)}`;
};

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

  console.log(user);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescriptionText(e.target.value);
  };

  // if (firstName === null || firstName === undefined) return null;

  return (
    <Popover className="relative">
      <Popover.Button>
        <img
          alt="user avatar"
          src={user?.imageUrl}
          className="mx-auto rounded-full h-12 w-12"
        />
      </Popover.Button>

      <Popover.Panel className="absolute top-[60px] -right-5 w-80 h-96 rounded-lg bg-white z-10 shadow-custom">
        <div className="flex flex-col">
          <img
            alt="user avatar"
            src={user?.imageUrl}
            className="mx-auto rounded-full my-6"
            width={110}
            height={110}
          />

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
