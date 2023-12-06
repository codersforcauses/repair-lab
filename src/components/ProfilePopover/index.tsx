import { useEffect, useState } from "react";
import { UserResource } from "@clerk/types";
import { Popover, Transition } from "@headlessui/react";
import { GoCheck, GoPencil, GoX } from "react-icons/go";

import { useAuth } from "@/hooks/auth";
import { UserRole } from "@/types";

interface Props {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  role: UserRole;
  desc: string | null | undefined;
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
  desc
}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [description, setDescription] = useState(desc);
  const [initialDescription, setInitialDescription] = useState(desc);
  const { user } = useAuth();

  // if (firstName === null || firstName === undefined) return null;

  useEffect(() => {
    setDescription(desc);
  }, [desc]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 200) {
      setDescription(e.target.value); // Update the description state with the new value
    }
  };

  const handleEditClick = () => {
    if (!isEdit) {
      setInitialDescription(description); // Store the initial description when starting to edit
    }
    setIsEdit(!isEdit);
  };

  const handleCancelClick = () => {
    setDescription(initialDescription); // Revert to the initial description on cancel
    setIsEdit(false);
  };

  const handleSaveClick = async () => {
    await updateUserMetadata(user, description ?? "");
    setIsEdit(false);
  };

  return (
    <Popover className="relative">
      <Popover.Button>
        <img
          alt="user avatar"
          src={user?.imageUrl}
          className="focus:outline-none mx-auto outline-none rounded-full h-12 w-12"
        />
      </Popover.Button>
      <Transition
        as={Popover.Panel}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel className="absolute top-[60px] -right-5 w-80 h-96 rounded-lg bg-white z-10 shadow-custom">
          <div className="flex flex-col">
            {/* avatar */}
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
              <div className="text-[24px] text-slate-500">
                {String(role).charAt(0).toUpperCase() +
                  String(role).slice(1).toLowerCase()}
              </div>
            </div>

            {/* description textarea */}
            <div
              className={
                "relative mx-auto mt-[20px] w-[280px] h-[93px] border-2 rounded-xl " +
                (isEdit
                  ? "border-lightAqua-200 bg-white"
                  : "border-slate-300 bg-slate-50 text-slate-500")
              }
            >
              <textarea
                ref={(textareaRef) =>
                  textareaRef && isEdit && textareaRef.focus()
                }
                disabled={!isEdit}
                value={description ?? ""}
                className={
                  "no-scrollbar resize-none w-full h-2/3 px-2 py-1 outline-none text-slate-80 rounded-xl " +
                  (isEdit ? "bg-white" : "bg-slate-50")
                }
                onChange={handleChange}
                onFocus={(e) =>
                  e.currentTarget.setSelectionRange(
                    e.currentTarget.value.length,
                    e.currentTarget.value.length
                  )
                }
              ></textarea>

              <span className="absolute bottom-1 right-3">
                {!isEdit ? (
                  <button
                    className="text-l space-x-1 text-primary-600"
                    onClick={handleEditClick}
                  >
                    <GoPencil className="inline text-xl" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <span className="space-x-2 text-2xl">
                    <button>
                      <GoCheck
                        strokeWidth="1.2"
                        className="inline text-green-500"
                        onClick={handleSaveClick}
                      />
                    </button>
                    <button>
                      <GoX
                        strokeWidth="1.2"
                        className="inline text-red-600"
                        onClick={handleCancelClick}
                      />
                    </button>
                  </span>
                )}
              </span>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
