import ProfilePopover from "@/components/ProfilePopover";
import { UserRole } from "@/types";
import { useRouter } from "next/router";

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

  const handleButtonClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-row pl-20 space-x-1">
      {isLoggedIn ? (
        <>
          <button
            onClick={() => router.push("/repair-request")}
            className="flex items-center justify-center mt-2.5 px-2 placeholder:w-[200px] h-[40px] rounded-full bg-primary-700 text-white font-medium outline-none hover:bg-primary-800"
          >
            New Repair Request +
          </button>

          <ActionButton onClick={onSignOut} label="Log out" />

          <ProfilePopover
            firstName={firstName}
            lastName={lastName}
            role={role}
            desc={desc}
          />
        </>
      ) : (
        <ActionButton onClick={() => router.push("/login")} label="Sign in" />
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
      className="w-[200px] h-[60px] rounded-lg font-medium outline-none text-black hover:bg-slate-100 hover:text-primary-700"
    >
      {label}
    </button>
  );
}
