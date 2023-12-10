import ProfilePopover from "@/components/ProfilePopover";
import { NavPath, UserRole } from "@/types";
import { useRouter } from "next/router";

interface Props {
  firstName?: string;
  lastName?: string;
  role: UserRole;
  desc: string;
  isLoggedIn: boolean; // New prop to determine login status
  onSignOut: () => void; // New prop for handling click event
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

  const handleSignIn = () => {
    router.push("/login"); // Navigate to the sign-in page
  };

  return (
    <div className="flex flex-row pl-20 space-x-1">
      {isLoggedIn ? (
        <>
          <button onClick={onSignOut} className="w-[200px] h-[60px] rounded-lg font-medium outline-none text-black hover:bg-slate-100 hover:text-primary-700">
            Log out
          </button>
          <ProfilePopover
            firstName={firstName}
            lastName={lastName}
            role={role}
            desc={desc}
          />
        </>
      ) : (
        <button onClick={handleSignIn} className="w-[200px] h-[60px] rounded-lg font-medium outline-none text-black hover:bg-slate-100 hover:text-primary-700">
          Sign in
        </button>
      )}
    </div>
  );
}