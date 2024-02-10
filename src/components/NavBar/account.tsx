import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";

import Modal from "@/components/Modal";
import ProfilePopover from "@/components/ProfilePopover";
import { UserRole } from "@/types";

interface Props {
  role: UserRole;
  isLoggedIn: boolean;
  onSignOut: () => void;
}

export default function Account({ isLoggedIn, onSignOut }: Readonly<Props>) {
  const router = useRouter();

  const [ShowConfirmLogOut, setShowConfirmLogOut] = useState(false);
  function confirmLogOut() {
    setShowConfirmLogOut(true);
  }

  function hideConfirmLogOut() {
    setShowConfirmLogOut(false);
  }

  return (
    <div className="flex items-center">
      {isLoggedIn ? (
        <>
          <Link
            href="/repair-request"
            className="flex items-center justify-center px-2 mx-4 h-[40px] rounded-full bg-primary-700 text-white font-medium outline-none hover:bg-primary-800"
          >
            {/* Text visible on larger screens, hidden on smaller screens */}
            <span className="hidden lg:flex placeholder:w-[160px]">
              New Repair Request +
            </span>
            {/* Icon visible on smaller screens, hidden on larger screens */}
            <FaPlus className="lg:hidden w-[40px]" />
          </Link>

          <ActionButton onClick={confirmLogOut} label="Log Out" />
          <Modal
            title="Are you sure you want to logout?"
            showModal={ShowConfirmLogOut}
            setShowPopup={setShowConfirmLogOut}
          >
            <div className="text-center">
              <ActionButton onClick={onSignOut} label="Yes" />
              <ActionButton onClick={hideConfirmLogOut} label="No" />
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
