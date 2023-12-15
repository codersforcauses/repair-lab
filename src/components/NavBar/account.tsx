import { useRouter } from "next/router";

import ProfilePopover from "@/components/ProfilePopover";
import { UserRole } from "@/types";

interface Props {
  firstName?: string;
  lastName?: string;
  role: UserRole;
  desc: string;
  isLoggedIn: boolean;
  onSignOut: () => void;
}

export default function Account({
  firstName,
  lastName,
  role,
  desc,
  isLoggedIn,
  onSignOut
}: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center ">
      {isLoggedIn ? (
        <>
          <button
            onClick={() => router.push("/repair-request")}
            className="flex items-center justify-center px-2 placeholder:w-[160px] h-[40px]  rounded-full bg-primary-700 text-white font-medium outline-none hover:bg-primary-800"
          >
            New Repair Request +
          </button>

          <button
            onClick={() => router.push("/repair-request")}
            className="flex items-center justify-center px-2 placeholder:w-[160px] h-[40px] rounded-full bg-primary-700 text-white font-medium outline-none hover:bg-primary-800"
          >
            New Event +
          </button>

          <ActionButton onClick={onSignOut} label="Log Out" />

          <ProfilePopover
            firstName={firstName}
            lastName={lastName}
            role={role}
            desc={desc}
          />
        </>
      ) : (
        <ActionButton onClick={() => router.push("/login")} label="Sign In" />
      )}
    </div>
  );
}

function ActionButton({
  onClick,
  label
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-[160px] h-[60px] rounded-lg font-medium outline-none text-black hover:bg-slate-100 hover:text-primary-700"
    >
      {label}
    </button>
  );
}
