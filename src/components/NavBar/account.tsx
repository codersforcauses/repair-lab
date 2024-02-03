import { useRouter } from "next/router";
import { useState } from "react";
import ProfilePopover from "@/components/ProfilePopover";
import { UserRole } from "@/types";
import Link from "next/link";
import Modal from "@/components/Modal";

interface Props {
  role: UserRole;
  isLoggedIn: boolean;
  onSignOut: () => void;
}

const adminRoles = [
  UserRole.ADMIN,
  UserRole.ORGANISATION_MANAGER,
  UserRole.EVENT_MANAGER
];

export default function Account({
  
  role,
  isLoggedIn,
  onSignOut
}: Readonly<Props>) {
  const router = useRouter();

  const [ShowConfirmLogOut, setShowConfirmLogOut] = useState(false);
  function confirmLogOut() {
    setShowConfirmLogOut(true);
  }

  return (
    <div className="flex items-center">
      {isLoggedIn ? (
        <>
          <Link
            href="/repair-request"
            className="flex items-center justify-center px-2 mx-4 placeholder:w-[160px] h-[40px]  rounded-full bg-primary-700 text-white font-medium outline-none hover:bg-primary-800"
          >
            New Repair Request +
          </Link>

          <ActionButton onClick={confirmLogOut} label="Log Out" />
          <Modal
              showModal={ShowConfirmLogOut}
              setShowPopup={setShowConfirmLogOut}
              
            >
              <div className="text-center">
                <h1 className="text-xl font-bold">Are you sure you want to logout?</h1>
                <ActionButton onClick={onSignOut} label="Yes" />
                <ActionButton onClick={onSignOut} label="No" />
              </div>
            </Modal>

          <ProfilePopover />
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
}: Readonly<{
  onClick: () => void;
  label: string;
}>) {
  return (
    <button
      onClick={onClick}
      className="w-[160px] h-[60px] rounded-lg font-medium outline-none text-black hover:text-primary-700"
    >
      {label}
    </button>
  );
}
