import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { VscChromeClose, VscMenu } from "react-icons/vsc";

import ProfilePopover from "@/components/ProfilePopover";
import { MenuItems } from "@/components/NavBar";

interface NavItems {
  menuItems: MenuItems[];
}

const VerticalBar = (props: NavItems) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button onClick={toggleSidebar}>
        {isOpen ? <VscChromeClose /> : <VscMenu />}
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 z-50 w-64 h-screen bg-white">
          <div className="p-4 border-b">
            <Image
              src="/images/repair_lab_logo.png"
              alt="Repair Labs Logo"
              width={50}
              height={50}
            />
            <button onClick={toggleSidebar}>
              <VscChromeClose />
            </button>
          </div>
          {menuItems.map((item) => (
            <Link href={item.path} key={item.item}>
              <a className="block p-4 border-b hover:bg-gray-100">
                {item.item}
              </a>
            </Link>
          ))}
          <div className="absolute bottom-0 w-full">
            {props. ? (
              <>
                <button
                  onClick={onSignOut}
                  className="w-full p-4 border-b hover:bg-gray-100"
                >
                  Log Out
                </button>
                <ProfilePopover />
              </>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="w-full p-4 border-b hover:bg-gray-100"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerticalBar;
